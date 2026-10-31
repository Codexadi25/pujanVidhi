const User = require('../models/User'), { verifyToken } = require('../utils/token'), fail = require('../utils/httpError'), asyncHandler = require('../utils/asyncHandler');
module.exports = asyncHandler(async (req, res, next) => {
  let id; try { ({ id } = verifyToken((req.headers.authorization || '').slice(7))); } catch { throw fail(401, 'Please login'); }
  req.user = await User.findById(id); if (!req.user) throw fail(401, 'Please login'); next();
});
