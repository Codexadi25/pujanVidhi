const User = require('../models/User');
const Payment = require('../models/Payment');
const Product = require('../models/Product');

exports.markPaid = async (user, orderId, paymentId, plan = 'kit', hasVideoAccess = false, amount = 0) => {
  const planType = plan || user.plan || 'digital_kit';
  const videoAccess = Boolean(hasVideoAccess || planType === 'video_kit');

  Object.assign(user, {
    paid: true,
    hasPaid: true,
    orderId,
    paymentId,
    plan: planType,
    hasVideoAccess: videoAccess,
    paidAt: new Date(),
    updatedAt: new Date()
  });
  await user.save();

  // Record / update Payment ledger
  try {
    let resolvedAmount = amount;
    if (!resolvedAmount) {
      const prod = await Product.findOne({
        type: planType === 'video_kit' ? 'video_kit' : 'digital_kit',
        isActive: true
      });
      resolvedAmount = prod?.price || (planType === 'video_kit' ? 51 : 21);
    }

    await Payment.findOneAndUpdate(
      { orderId },
      {
        orderId,
        paymentId,
        userId: user._id,
        kalyanamId: user.kalyanamId,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        amount: resolvedAmount,
        currency: 'INR',
        status: 'captured',
        plan: planType,
        hasVideoAccess: videoAccess,
        diagnostics: {
          failureCategory: 'Captured Successfully',
          failedComponent: 'Razorpay PG & Server Verification',
          diagnosticSummary: 'Payment verified and sacred puja vidhi access granted'
        },
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error('Payment ledger update error:', err.message);
  }

  return user;
};

exports.markPaidByKalyanamId = async (kid, orderId, paymentId, plan = 'kit', hasVideoAccess = false, amount = 0) => {
  const u = kid && await User.findOne({ kalyanamId: kid });
  if (u) await exports.markPaid(u, orderId, paymentId, plan, hasVideoAccess, amount);
};
