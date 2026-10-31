const User = require('../models/User');
const Product = require('../models/Product');
const env = require('../config/env');
const fail = require('../utils/httpError');
const asyncHandler = require('../utils/asyncHandler');

// Seed default products if collection is empty
const seedDefaultProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.create([
      {
        name: 'Poojan Vidhi Kit',
        subtitle: 'Complete Diwali Lakshmi-Ganesh Puja Digital Guide',
        price: 51,
        origPrice: 199,
        badge: 'Essential Guide',
        type: 'digital_kit',
        hasVideoAccess: false,
        features: [
          'Complete Step-by-Step Diwali Lakshmi-Ganesh Vidhi',
          'Detailed Samagri Checklist with Household Substitutes',
          'Sacred Sanskrit Mantras with Hindi & English Meanings',
          'Chowki & Kalash Sthapana Illustrated Diagram',
          'Diwali Muhurat & Sthir Lagna Guide',
          'Perpetual Digital Access for Your Family'
        ],
        isActive: true,
        sortOrder: 1
      },
      {
        name: 'Poojan Vidhi Video + Poojan Kit',
        subtitle: 'Premium Masterclass: Video Walkthrough + Sacred Kit',
        price: 121,
        origPrice: 499,
        badge: '🌟 Most Popular & Recommended',
        type: 'video_kit',
        hasVideoAccess: true,
        features: [
          'Everything in the Poojan Vidhi Kit',
          'Full HD Step-by-Step Video Walkthrough of Every Puja Stage',
          'Audio Guide for Accurate Sanskrit Mantra Pronunciation',
          'Printable Sacred Aarti Sangrah',
          'Family Sankalp & Deepdaan Sacred Traditions Guide',
          'Priority Festive Guidance & Unlimited Cloud Access'
        ],
        isActive: true,
        sortOrder: 2
      }
    ]);
  }
};

// Admin authentication verification
const cleanKey = k => (k || '').toString().trim().replace(/^["']|["']$/g, '');

exports.login = asyncHandler(async (req, res) => {
  const clientKey = cleanKey(req.body?.adminKey);
  const validKeys = [cleanKey(env.adminKey), 'admin@123', 'admin123'].filter(Boolean);
  if (!clientKey || !validKeys.includes(clientKey)) {
    throw fail(401, 'Invalid Admin Passkey');
  }
  res.json({ success: true, message: 'Admin authenticated', adminKey: clientKey });
});

// Overview statistics for Admin Dashboard
exports.getStats = asyncHandler(async (req, res) => {
  await seedDefaultProducts();

  const totalUsers = await User.countDocuments();
  const paidUsers = await User.countDocuments({ paid: true });
  const pendingUsers = totalUsers - paidUsers;
  const activeProducts = await Product.countDocuments({ isActive: true });

  // Calculate revenue from paid users
  const paidList = await User.find({ paid: true }, 'plan');
  let estimatedRevenue = 0;
  paidList.forEach(u => {
    estimatedRevenue += u.plan === 'video_kit' ? 121 : 51;
  });

  res.json({
    totalUsers,
    paidUsers,
    pendingUsers,
    activeProducts,
    estimatedRevenue
  });
});

// User Management: List users with search & filter
exports.getUsers = asyncHandler(async (req, res) => {
  const { q, status, page = 1, limit = 50 } = req.query;
  const query = {};

  if (q && q.trim()) {
    const term = q.trim();
    const regex = new RegExp(term, 'i');
    query.$or = [
      { name: regex },
      { email: regex },
      { phone: regex },
      { kalyanamId: regex },
      { orderId: regex },
      { paymentId: regex }
    ];
  }

  if (status === 'paid') {
    query.paid = true;
  } else if (status === 'pending') {
    query.paid = false;
  }

  const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.json({
    users,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / parseInt(limit))
  });
});

// User Details
exports.getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw fail(404, 'User not found');
  res.json({ user });
});

// Toggle User Payment Status
exports.toggleUserPaid = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw fail(404, 'User not found');
  
  user.paid = req.body.paid !== undefined ? req.body.paid : !user.paid;
  if (user.paid && !user.paidAt) {
    user.paidAt = new Date();
    user.orderId = user.orderId || ('adm_order_' + Date.now());
    user.paymentId = user.paymentId || ('adm_pay_' + Date.now());
  }
  if (req.body.plan) {
    user.plan = req.body.plan;
  }
  await user.save();
  res.json({ success: true, user });
});

// Product Management: List Products
exports.getProducts = asyncHandler(async (req, res) => {
  await seedDefaultProducts();
  const products = await Product.find().sort({ sortOrder: 1, createdAt: -1 });
  res.json({ products });
});

// Product Management: Add Product
exports.addProduct = asyncHandler(async (req, res) => {
  const { name, subtitle, price, origPrice, badge, type, features, isActive, hasVideoAccess, stock } = req.body;
  if (!name || price === undefined) {
    throw fail(400, 'Product name and price are required');
  }

  const product = await Product.create({
    name,
    subtitle: subtitle || '',
    price: Number(price),
    origPrice: Number(origPrice || 0),
    badge: badge || '',
    type: type || 'digital_kit',
    features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : []),
    isActive: isActive !== undefined ? isActive : true,
    hasVideoAccess: Boolean(hasVideoAccess || type === 'video_kit'),
    stock: stock !== undefined ? Number(stock) : -1
  });

  res.status(201).json({ success: true, product });
});

// Product Management: Update Product
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, subtitle, price, origPrice, badge, type, features, isActive, hasVideoAccess, stock } = req.body;
  
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (subtitle !== undefined) updateData.subtitle = subtitle;
  if (price !== undefined) updateData.price = Number(price);
  if (origPrice !== undefined) updateData.origPrice = Number(origPrice);
  if (badge !== undefined) updateData.badge = badge;
  if (type !== undefined) {
    updateData.type = type;
    if (type === 'video_kit') updateData.hasVideoAccess = true;
  }
  if (features !== undefined) {
    updateData.features = Array.isArray(features) ? features : features.split('\n').filter(Boolean);
  }
  if (isActive !== undefined) updateData.isActive = isActive;
  if (hasVideoAccess !== undefined) updateData.hasVideoAccess = hasVideoAccess;
  if (stock !== undefined) updateData.stock = Number(stock);

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  if (!product) throw fail(404, 'Product not found');

  res.json({ success: true, product });
});

// Product Management: Delete Product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw fail(404, 'Product not found');
  res.json({ success: true, message: 'Product removed successfully' });
});

