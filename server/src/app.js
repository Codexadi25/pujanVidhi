const express = require('express'), cors = require('cors'), helmet = require('helmet'), rateLimit = require('express-rate-limit'), path = require('path'), fs = require('fs');
const env = require('./config/env'), routes = require('./routes'), { webhook } = require('./controllers/payment.controller'), { notFound, errorHandler } = require('./middleware/error');
const adm = require('./controllers/admin.controller'), admin = require('./middleware/admin'), s = require('./controllers/settings.controller'), c = require('./controllers/content.controller'), h = require('./controllers/health.controller');

const app = express();
app.set('trust proxy', 1);

// Fast server wake-up endpoints for Render / Cloud hosting platforms
app.get('/ping', h.ping);
app.get('/health', h.ping);

// Configure CORS and Helmet to allow frontend URL, video streaming, and local connections
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

// Direct Admin API Router - supports /admin/login, /admin/stats, /admin/users, /admin/products directly
const adminApiRouter = express.Router();
adminApiRouter.post('/login', adm.login);
adminApiRouter.get('/stats', admin, adm.getStats);
adminApiRouter.get('/users', admin, adm.getUsers);
adminApiRouter.get('/users/:id', admin, adm.getUserDetails);
adminApiRouter.put('/users/:id/toggle-paid', admin, adm.toggleUserPaid);
adminApiRouter.get('/products', admin, adm.getProducts);
adminApiRouter.post('/products', admin, adm.addProduct);
adminApiRouter.put('/products/:id', admin, adm.updateProduct);
adminApiRouter.delete('/products/:id', admin, adm.deleteProduct);
adminApiRouter.put('/price', admin, s.setPrice);
adminApiRouter.get('/content', admin, c.getAdminContent);
adminApiRouter.put('/content', admin, c.updateAdminContent);

// Mount Admin API on /admin/api and /admin (for JSON API requests)
app.use('/admin/api', adminApiRouter);
app.use('/admin', (req, res, next) => {
  // If request is asking for API data (JSON or POST/PUT/DELETE)
  if (req.method !== 'GET' || req.headers.accept?.includes('application/json') || req.xhr) {
    return adminApiRouter(req, res, next);
  }
  next();
});

// Mount general API routes on /api/v1 and /api
app.use('/api/v1', routes);
app.use('/api', routes);

// Serve built React client if available, with direct /admin support
const clientDist = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
  app.get('/buy', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  // Fallback to server public static directory
  app.use('/admin', express.static(path.join(__dirname, '../public')));
}

app.use(notFound, errorHandler);
module.exports = app;
