const jwt = require('jsonwebtoken'), env = require('../config/env');
exports.signToken = u => jwt.sign({ id: u._id }, env.jwtSecret, { expiresIn: '30d' });
exports.verifyToken = t => jwt.verify(t, env.jwtSecret);
