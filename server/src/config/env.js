const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();
const E = process.env;
['MONGO_URI','JWT_SECRET','ADMIN_KEY','FRONTEND_URL','RAZORPAY_KEY_ID','RAZORPAY_KEY_SECRET'].forEach(k => { if (!E[k]) throw new Error('Missing env: ' + k); });
module.exports = { port: E.PORT || 5000, mongoUri: E.MONGO_URI, jwtSecret: E.JWT_SECRET, adminKey: E.ADMIN_KEY,
  frontendUrl: E.FRONTEND_URL, rzpKey: E.RAZORPAY_KEY_ID, rzpSecret: E.RAZORPAY_KEY_SECRET, rzpWebhookSecret: E.RAZORPAY_WEBHOOK_SECRET, defaultPrice: 111 };
