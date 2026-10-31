const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  subtitle: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  origPrice: { type: Number, default: 0 },
  badge: { type: String, default: '' },
  type: {
    type: String,
    enum: ['digital_kit', 'video_kit', 'physical_kit', 'other'],
    default: 'digital_kit'
  },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  hasVideoAccess: { type: Boolean, default: false },
  stock: { type: Number, default: -1 }, // -1 for unlimited digital items
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-generate slug from name if missing
productSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = model('Product', productSchema);

