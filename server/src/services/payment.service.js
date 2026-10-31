const User = require('../models/User');
exports.markPaid = async (user, orderId, paymentId, plan = 'kit') => {
  Object.assign(user, {
    paid: true,
    orderId,
    paymentId,
    plan: plan || user.plan || 'kit',
    paidAt: new Date()
  });
  return user.save();
};
exports.markPaidByKalyanamId = async (kid, orderId, paymentId, plan = 'kit') => {
  const u = kid && await User.findOne({ kalyanamId: kid });
  if (u) await exports.markPaid(u, orderId, paymentId, plan);
};
