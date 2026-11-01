const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const env = require('./config/env');
const routes = require('./routes');
const { webhook } = require('./controllers/payment.controller');
const { notFound, errorHandler } = require('./middleware/error');
const adm = require('./controllers/admin.controller');
const admin = require('./middleware/admin');
const s = require('./controllers/settings.controller');
const c = require('./controllers/content.controller');
const h = require('./controllers/health.controller');
const { createReactEngine } = require('./views/engine/reactEngine');

const app = express();
app.set('trust proxy', 1);

// Configure React.js View Engine on Express Server
app.engine('js', createReactEngine());
app.engine('jsx', createReactEngine());
app.set('views', path.join(__dirname, 'views/templates'));
app.set('view engine', 'js');

// Fast server wake-up endpoints for Render / Cloud hosting platforms
app.get('/ping', h.ping);
app.get('/health', h.ping);

// Configure CORS and Helmet
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}), cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length']
}), rateLimit({ windowMs: 6e4, max: 200 }));

app.post('/api/v1/webhook/razorpay', express.raw({ type: 'application/json' }), webhook); // raw body needed for signature
app.use(express.json());

// Direct Admin API Router - supports all endpoints directly under /admin/api and /admin
const adminApiRouter = express.Router();
adminApiRouter.post('/login', adm.login);
adminApiRouter.post('/change-password', admin, adm.changePassword);
adminApiRouter.get('/stats', admin, adm.getStats);
adminApiRouter.get('/telemetry', admin, adm.getTelemetry);

// Devotees & Users
adminApiRouter.get('/users', admin, adm.getUsers);
adminApiRouter.get('/users/:id', admin, adm.getUserDetails);
adminApiRouter.put('/users/:id/toggle-paid', admin, adm.toggleUserPaid);
adminApiRouter.put('/users/:id/plan', admin, adm.updateUserPlan);
adminApiRouter.delete('/users/:id', admin, adm.deleteUser);

// Orders & Payments
adminApiRouter.get('/orders', admin, adm.getOrders);
adminApiRouter.get('/orders/:orderId', admin, adm.getOrderDetails);
adminApiRouter.post('/orders/:orderId/tag', admin, adm.addOrderTag);
adminApiRouter.post('/orders/:orderId/comment', admin, adm.addOrderComment);
adminApiRouter.get('/lifeline', admin, adm.getLifeline);

// Support & PG Dispute Tickets
adminApiRouter.get('/tickets', admin, adm.getTickets);
adminApiRouter.post('/tickets', admin, adm.createTicket);
adminApiRouter.patch('/tickets/:id', admin, adm.updateTicket);

// Refunds & Reversals Console
adminApiRouter.get('/refunds', admin, adm.getRefunds);
adminApiRouter.post('/refunds/process', admin, adm.processRefund);

// Audit & Security Event Logs
adminApiRouter.get('/logs', admin, adm.getLogs);

// Products & Pricing
adminApiRouter.get('/products', admin, adm.getProducts);
adminApiRouter.post('/products', admin, adm.addProduct);
adminApiRouter.put('/products/:id', admin, adm.updateProduct);
adminApiRouter.delete('/products/:id', admin, adm.deleteProduct);
adminApiRouter.put('/price', admin, s.setPrice);
adminApiRouter.get('/settings', admin, s.getCompanySettings);
adminApiRouter.put('/settings', admin, s.setCompanySettings);
adminApiRouter.get('/content', admin, c.getAdminContent);
adminApiRouter.put('/content', admin, c.updateAdminContent);

// Mount Admin API on /admin/api
app.use('/admin/api', adminApiRouter);

// Server-Side React Lifeline Template Endpoints (React View Engine)
app.get(['/templates/lifeline', '/lifeline'], (req, res) => {
  try {
    const q = req.query.q || req.query.orderId || req.query.email || '';
    const type = req.query.type || (req.query.orderId ? 'orderId' : (req.query.email ? 'email' : 'orderId'));

    res.render('LifelineTemplate', {
      initialQuery: { type, q },
      user: {
        name: 'Devotee Investigation',
        email: 'admin@poojanvidhi.com',
        watermark: 'POOJANVIDHI | VERIFIED SERVER LIFELINE',
      },
    });
  } catch (err) {
    res.status(500).send(`Failed to render Lifeline Template: ${err.message}`);
  }
});

// Server-Side React Admin Dashboard Template Endpoints (React View Engine)
app.get(['/templates/admin', '/dashboard'], (req, res) => {
  try {
    res.render('AdminDashboardTemplate', {
      title: 'PoojanVidhi Server Control Center | Backend Admin & Telemetry Hub',
      initialTab: req.query.tab || 'telemetry'
    });
  } catch (err) {
    res.status(500).send(`Failed to render Admin Dashboard Template: ${err.message}`);
  }
});

// Mount general API routes on /api/v1 and /api
app.use('/api/v1', routes);
app.use('/api', routes);

// Serve Backend Admin Control Center Static Assets
const adminPublic = path.join(__dirname, '../public');
app.use(express.static(adminPublic));

// Intercept /admin: if JSON request, route to adminApiRouter; if browser HTML, render React template or serve index.html
app.use('/admin', (req, res, next) => {
  if (req.method !== 'GET' || req.headers.accept?.includes('application/json') || req.xhr) {
    return adminApiRouter(req, res, next);
  }
  res.render('AdminDashboardTemplate', {
    title: 'PoojanVidhi Server Control Center | Backend Admin & Telemetry Hub'
  }, (err, html) => {
    if (err) {
      return res.sendFile(path.join(adminPublic, 'index.html'));
    }
    res.send(html);
  });
});

// Root path serves the Admin Control Center
app.get('/', (req, res) => {
  res.sendFile(path.join(adminPublic, 'index.html'));
});

app.use(notFound, errorHandler);
module.exports = app;
