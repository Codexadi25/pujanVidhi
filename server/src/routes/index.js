const r = require('express').Router(), auth = require('../middleware/auth'), admin = require('../middleware/admin'), rateLimit = require('express-rate-limit');
const h = require('../controllers/health.controller'), a = require('../controllers/auth.controller'), p = require('../controllers/payment.controller'),
  c = require('../controllers/content.controller'), s = require('../controllers/settings.controller'), adm = require('../controllers/admin.controller');

// Dedicated rate limiting for sacred document access to prevent automated content scraping
const documentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Document access limit reached. Please wait a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

r.get('/ping', h.ping);
r.get('/price', s.getPrice);
r.put('/admin/price', admin, s.setPrice);
r.get('/settings', s.getCompanySettings);
r.get('/admin/settings', admin, s.getCompanySettings);
r.put('/admin/settings', admin, s.setCompanySettings);
r.get('/products', adm.getProducts);

// Admin Auth & Stats
r.post('/admin/login', adm.login);
r.post('/admin/change-password', admin, adm.changePassword);
r.get('/admin/stats', admin, adm.getStats);
r.get('/admin/telemetry', admin, adm.getTelemetry);

// Admin User Management
r.get('/admin/users', admin, adm.getUsers);
r.get('/admin/users/:id', admin, adm.getUserDetails);
r.put('/admin/users/:id/toggle-paid', admin, adm.toggleUserPaid);
r.put('/admin/users/:id/plan', admin, adm.updateUserPlan);
r.delete('/admin/users/:id', admin, adm.deleteUser);

// Admin Orders & Lifeline Diagnostics
r.get('/admin/orders', admin, adm.getOrders);
r.get('/admin/orders/:orderId', admin, adm.getOrderDetails);
r.post('/admin/orders/:orderId/tag', admin, adm.addOrderTag);
r.post('/admin/orders/:orderId/comment', admin, adm.addOrderComment);
r.get('/admin/lifeline', admin, adm.getLifeline);

// Admin Support & PG Dispute Tickets
r.get('/admin/tickets', admin, adm.getTickets);
r.post('/admin/tickets', admin, adm.createTicket);
r.patch('/admin/tickets/:id', admin, adm.updateTicket);

// Admin Refunds & Reversals Console
r.get('/admin/refunds', admin, adm.getRefunds);
r.post('/admin/refunds/process', admin, adm.processRefund);

// Admin Platform Audit & Security Event Logs
r.get('/admin/logs', admin, adm.getLogs);

// Admin Product Management
r.get('/admin/products', admin, adm.getProducts);
r.post('/admin/products', admin, adm.addProduct);
r.put('/admin/products/:id', admin, adm.updateProduct);
r.delete('/admin/products/:id', admin, adm.deleteProduct);

// User Auth & Order
r.post('/register', a.register);
r.post('/login', a.login);
r.post('/access', a.access);
r.get('/me', auth, a.me);
r.post('/order', auth, p.createOrder);
r.post('/verify', auth, p.verify);
r.post('/pay-test', auth, p.payTest);
r.get('/content', auth, documentLimiter, c.getContent);
r.get('/content/video', documentLimiter, c.streamVideo);
r.get('/content/pdf', documentLimiter, c.downloadPdf);

// Admin Content Editing
r.get('/admin/content', admin, c.getAdminContent);
r.put('/admin/content', admin, c.updateAdminContent);

module.exports = r;
