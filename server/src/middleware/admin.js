const env = require('../config/env'), fail = require('../utils/httpError');
module.exports = (req, res, next) => req.headers['x-admin-key'] === env.adminKey ? next() : next(fail(403, 'Forbidden'));
