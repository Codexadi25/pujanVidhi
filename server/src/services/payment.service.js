const User = require('../models/User');
exports.markPaid = async (user, orderId, paymentId, plan = 'kit', hasVideoAccess = false) => {
  Object.assign(user, {
    paid: true,
    orderId,
    paymentId,
    plan: plan || user.plan || 'kit',
    hasVideoAccess: Boolean(hasVideoAccess || plan === 'video_kit'),
    paidAt: new Date()
  });
  return user.save();
};
exports.markPaidByKalyanamId = async (kid, orderId, paymentId, plan = 'kit', hasVideoAccess = false) => {
  const u = kid && await User.findOne({ kalyanamId: kid });
  if (u) await exports.markPaid(u, orderId, paymentId, plan, hasVideoAccess);
};
