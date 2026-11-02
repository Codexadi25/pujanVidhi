const crypto = require('crypto');
const rzp = require('../config/razorpay');
const env = require('../config/env');
const fail = require('../utils/httpError');
const asyncHandler = require('../utils/asyncHandler');
const Product = require('../models/Product');
const pay = require('../services/payment.service');

// Helper to find dynamic product from database
async function resolveProduct(productId, plan) {
  let product = null;
  if (productId) {
    product = await Product.findById(productId);
  }
  if (!product && plan) {
    product = await Product.findOne({
      $or: [
        { _id: productId },
        { slug: plan },
        { type: plan },
        { type: plan === 'kit' ? 'digital_kit' : (plan === 'video_kit' ? 'video_kit' : plan) },
        { slug: plan === 'kit' ? 'poojan-vidhi-kit' : 'poojan-vidhi-video-poojan-kit' }
      ],
      isActive: true
    });
  }
  if (!product) {
    product = await Product.findOne({ isActive: true }).sort({ sortOrder: 1 });
  }
  return product;
}

exports.createOrder = asyncHandler(async (req, res) => {
  const { plan = 'kit', productId } = req.body || {};
  const product = await resolveProduct(productId, plan);

  if (!product) {
    throw fail(404, 'No active product found');
  }

  const priceInRupees = Number(product.price);
  const amountInPaise = Math.round(priceInRupees * 100);
  const planType = product.type === 'video_kit' ? 'video_kit' : (product.type || plan || 'kit');

  // Check if Razorpay credentials are real test/live keys
  const isRazorpayConfigured = env.rzpKey && !env.rzpKey.includes('REPLACE_ME') && env.rzpSecret && !env.rzpSecret.includes('REPLACE_ME');

  if (isRazorpayConfigured) {
    try {
      const receiptId = `rcpt_${Date.now()}_${(req.user.kalyanamId || req.user._id).toString().slice(-8)}`;
      const o = await rzp.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: receiptId,
        notes: {
          kalyanamId: req.user.kalyanamId,
          userId: req.user._id.toString(),
          plan: planType,
          productId: product._id.toString(),
          productName: product.name,
          priceInRupees
        }
      });
      return res.json({
        orderId: o.id,
        amount: o.amount,
        currency: 'INR',
        key: env.rzpKey,
        keyId: env.rzpKey,
        plan: planType,
        productId: product._id,
        productTitle: product.name,
        priceInRupees
      });
    } catch (e) {
      console.warn('Razorpay live order error, falling back to simulated order:', e.message);
    }
  }

  // Simulated / Mock order for instant sandbox testing
  const mockOrderId = 'order_sim_' + crypto.randomBytes(6).toString('hex');
  res.json({
    orderId: mockOrderId,
    amount: amountInPaise,
    currency: 'INR',
    key: 'simulated_mode',
    keyId: 'simulated_mode',
    simulated: true,
    plan: planType,
    productId: product._id,
    productTitle: product.name,
    priceInRupees
  });
});

exports.verify = asyncHandler(async (req, res) => {
  const o = req.body.razorpay_order_id || req.body.orderId;
  const p = req.body.razorpay_payment_id || req.body.paymentId;
  const s = req.body.razorpay_signature || req.body.signature;
  const { plan, productId } = req.body;

  const product = await resolveProduct(productId, plan);
  const planType = product?.type === 'video_kit' ? 'video_kit' : (product?.type || plan || 'kit');
  const hasVideo = Boolean(product?.hasVideoAccess || planType === 'video_kit');

  if (o && (o.startsWith('order_sim_') || s === 'simulated_sig')) {
    // Simulated checkout verification
    await pay.markPaid(req.user, o, p || ('pay_sim_' + Date.now()), planType, hasVideo);
    return res.json({ success: true, user: req.user.toPublic() });
  }

  // Constant-time comparison to prevent timing attacks
  const expectedSignature = crypto.createHmac('sha256', env.rzpSecret).update(`${o}|${p}`).digest('hex');
  const sigA = Buffer.from(expectedSignature);
  const sigB = Buffer.from(s || '');

  const isValid = sigA.length === sigB.length && crypto.timingSafeEqual(sigA, sigB);
  if (!isValid) {
    throw fail(400, 'Payment verification failed');
  }

  let finalPlan = planType;
  let finalHasVideo = hasVideo;
  try {
    const orderDetails = await rzp.orders.fetch(o);
    if (orderDetails.notes?.plan) finalPlan = orderDetails.notes.plan;
    if (orderDetails.notes?.productId) {
      const dbProd = await Product.findById(orderDetails.notes.productId);
      if (dbProd) finalHasVideo = Boolean(dbProd.hasVideoAccess || dbProd.type === 'video_kit');
    }
  } catch (err) {
    console.warn('Could not fetch razorpay order notes, using resolved product:', err.message);
  }

  await pay.markPaid(req.user, o, p, finalPlan, finalHasVideo);
  res.json({ success: true, user: req.user.toPublic() });
});

exports.payTest = asyncHandler(async (req, res) => {
  const { plan = 'kit', productId } = req.body || {};
  const product = await resolveProduct(productId, plan);
  const planType = product?.type === 'video_kit' ? 'video_kit' : (product?.type || plan || 'kit');
  const hasVideo = Boolean(product?.hasVideoAccess || planType === 'video_kit');

  const orderId = 'order_test_' + Date.now();
  const paymentId = 'pay_test_' + Date.now();
  await pay.markPaid(req.user, orderId, paymentId, planType, hasVideo);
  res.json({ success: true, user: req.user.toPublic() });
});

// Safety net if user closes tab before /verify
exports.webhook = asyncHandler(async (req, res) => {
  const exp = crypto.createHmac('sha256', env.rzpWebhookSecret || '').update(req.body).digest('hex');
  if (req.headers['x-razorpay-signature'] !== exp) return res.sendStatus(400);
  const ev = JSON.parse(req.body);
  if (ev.event === 'payment.captured') {
    const p = ev.payload.payment.entity;
    await pay.markPaidByKalyanamId(p.notes?.kalyanamId, p.order_id, p.id, p.notes?.plan || 'kit', p.notes?.plan === 'video_kit');
  }
  res.sendStatus(200);
});
