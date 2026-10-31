const asyncHandler = require('../utils/asyncHandler'), fail = require('../utils/httpError'), price = require('../services/price.service');
exports.getPrice = asyncHandler(async (req, res) => res.json({ price: await price.getPrice() }));
exports.setPrice = asyncHandler(async (req, res) => {
  const v = Number(req.body.price); if (!(v >= 1)) throw fail(400, 'Invalid price');
  res.json({ price: (await price.setPrice(v)).value });
});
