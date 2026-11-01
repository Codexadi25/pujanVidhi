const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'admin', index: true },
    userEmail: { type: String, required: true },
    action: {
      type: String,
      enum: [
        'LOGIN',
        'ADMIN_LOGIN',
        'PASSWORD_CHANGE',
        'PAYMENT_INIT',
        'PAYMENT_SUCCESS',
        'PAYMENT_FAILED',
        'ACCESS_GRANTED',
        'ACCESS_REVOKED',
        'PLAN_UPDATED',
        'PRICE_UPDATED',
        'PRODUCT_CREATED',
        'PRODUCT_UPDATED',
        'PRODUCT_DELETED',
        'REFUND_PROCESSED',
        'TICKET_CREATED',
        'TICKET_UPDATED',
        'SETTINGS_UPDATED',
        'SECURITY_BREACH_ATTEMPT',
      ],
      default: 'ADMIN_LOGIN',
      required: true,
    },
    ipAddress: { type: String, default: '127.0.0.1' },
    userAgent: { type: String, default: 'N/A' },
    metaData: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ActivityLog', activityLogSchema);

