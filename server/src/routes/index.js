const r = require('express').Router(), auth = require('../middleware/auth'), admin = require('../middleware/admin');
const h = require('../controllers/health.controller'), a = require('../controllers/auth.controller'), p = require('../controllers/payment.controller'),
  c = require('../controllers/content.controller'), s = require('../controllers/settings.controller'), adm = require('../controllers/admin.controller');

r.get('/ping', h.ping);
r.get('/price', s.getPrice);
r.put('/admin/price', admin, s.setPrice);
r.get('/products', adm.getProducts);

// Admin Auth & Stats
r.post('/admin/login', adm.login);
r.get('/admin/stats', admin, adm.getStats);

// Admin User Management
r.get('/admin/users', admin, adm.getUsers);
r.get('/admin/users/:id', admin, adm.getUserDetails);
r.put('/admin/users/:id/toggle-paid', admin, adm.toggleUserPaid);

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
r.get('/content', auth, c.getContent);

module.exports = r;
