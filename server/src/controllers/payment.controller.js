const crypto = require('crypto'), rzp = require('../config/razorpay'), env = require('../config/env'), fail = require('../utils/httpError'),
  asyncHandler = require('../utils/asyncHandler'), { getPrice } = require('../services/price.service'), pay = require('../services/payment.service');

exports.createOrder = asyncHandler(async (req, res) => {
  const plan = req.body?.plan || 'kit';
  const amount = plan === 'video_kit' ? 121 : 51;

  // Check if Razorpay credentials are real test/live keys
  const isRazorpayConfigured = env.rzpKey && !env.rzpKey.includes('REPLACE_ME') && env.rzpSecret && !env.rzpSecret.includes('REPLACE_ME');

  if (isRazorpayConfigured) {
    try {
      const o = await rzp.orders.create({
        amount: amount * 100,
        currency: 'INR',
        receipt: req.user.kalyanamId,
        notes: { kalyanamId: req.user.kalyanamId, plan }
      });
      return res.json({ orderId: o.id, amount: o.amount, key: env.rzpKey, plan });
    } catch (e) {
      console.warn('Razorpay order fallback to simulated order:', e.message);
    }
  }

  // Simulated / Mock order for instant sandbox testing
  const mockOrderId = 'order_sim_' + crypto.randomBytes(6).toString('hex');
  res.json({
    orderId: mockOrderId,
    amount: amount * 100,
    key: 'simulated_mode',
    simulated: true,
    plan
  });
});

exports.verify = asyncHandler(async (req, res) => {
  const { razorpay_order_id: o, razorpay_payment_id: p, razorpay_signature: s, plan } = req.body;
  
  if (o && o.startsWith('order_sim_')) {
    // Simulated checkout verification
    await pay.markPaid(req.user, o, p || ('pay_sim_' + Date.now()), plan || 'kit');
    return res.json({ success: true, user: req.user.toPublic() });
  }

  if (crypto.createHmac('sha256', env.rzpSecret).update(o + '|' + p).digest('hex') !== s) {
    throw fail(400, 'Payment verification failed');
  }
  const orderDetails = await rzp.orders.fetch(o);
  if (orderDetails.receipt !== req.user.kalyanamId) throw fail(403, 'Order mismatch');
  
  await pay.markPaid(req.user, o, p, orderDetails.notes?.plan || plan || 'kit');
  res.json({ success: true, user: req.user.toPublic() });
});

exports.payTest = asyncHandler(async (req, res) => {
  const plan = req.body?.plan || 'kit';
  const orderId = 'order_test_' + Date.now();
  const paymentId = 'pay_test_' + Date.now();
  await pay.markPaid(req.user, orderId, paymentId, plan);
  res.json({ success: true, user: req.user.toPublic() });
});

// Safety net if user closes the tab before /verify. Set this URL in Razorpay dashboard: POST /api/v1/webhook/razorpay (event payment.captured)
exports.webhook = asyncHandler(async (req, res) => {
  const exp = crypto.createHmac('sha256', env.rzpWebhookSecret || '').update(req.body).digest('hex');
  if (req.headers['x-razorpay-signature'] !== exp) return res.sendStatus(400);
  const ev = JSON.parse(req.body);
  if (ev.event === 'payment.captured') {
    const p = ev.payload.payment.entity;
    await pay.markPaidByKalyanamId(p.notes?.kalyanamId, p.order_id, p.id, p.notes?.plan || 'kit');
  }
  res.sendStatus(200);
});
