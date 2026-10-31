const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  orderId: { type: String, required: true, index: true },
  paymentId: { type: String, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  kalyanamId: { type: String, index: true },
  userName: { type: String },
  userEmail: { type: String, index: true },
  userPhone: { type: String, index: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['created', 'captured', 'failed', 'refunded', 'canceled'],
    default: 'created',
    index: true
  },
  plan: { type: String, default: 'digital_kit' },
  hasVideoAccess: { type: Boolean, default: false },
  failureReason: { type: String },
  diagnostics: {
    failureCategory: { type: String },
    failedComponent: { type: String },
    diagnosticSummary: { type: String }
  },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = model('Payment', paymentSchema);
