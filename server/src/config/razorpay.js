const Razorpay = require('razorpay'), env = require('./env');
module.exports = new Razorpay({ key_id: env.rzpKey, key_secret: env.rzpSecret });
