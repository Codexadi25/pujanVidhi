const { Schema, model } = require('mongoose');
const s = new Schema({
  kalyanamId: { type: String, unique: true },
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  paid: { type: Boolean, default: false },
  plan: { type: String, default: 'kit' }, // 'kit' (Poojan Vidhi Kit) or 'video_kit' (Poojan Vidhi Video + Poojan Kit)
  orderId: String,
  paymentId: String,
  paidAt: Date
}, { timestamps: true });
s.methods.toPublic = function () {
  return {
    kalyanamId: this.kalyanamId,
    name: this.name,
    email: this.email,
    phone: this.phone,
    paid: this.paid,
    plan: this.plan,
    paidAt: this.paidAt
  };
};
module.exports = model('User', s);
