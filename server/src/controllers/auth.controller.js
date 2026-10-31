  const bcrypt = require('bcryptjs'), crypto = require('crypto'), User = require('../models/User'),
  { signToken } = require('../utils/token'), fail = require('../utils/httpError'), asyncHandler = require('../utils/asyncHandler');
const out = u => ({ token: signToken(u), user: u.toPublic() });
exports.register = asyncHandler(async (req, res) => {
  let { name, phone, email, password } = req.body;
  phone = (phone || '').trim();
  if (!name || !/^\d{10}$/.test(phone)) throw fail(400, 'Please fill all details correctly');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) email = `${phone}@astrodev.app`;
  if (!password || password.length < 6) password = 'User@' + phone;
  let u = await User.findOne({ $or: [{ phone }, { email: email.toLowerCase() }] });
  if (u) {
    return res.json(out(u));
  }
  u = await User.create({ name, phone, email: email.toLowerCase(), password: await bcrypt.hash(password, 10), kalyanamId: 'KLY' + crypto.randomInt(1e6, 1e7) });
  res.json(out(u));
});
exports.login = asyncHandler(async (req, res) => {
  const u = await User.findOne({ email: (req.body.email || '').toLowerCase() });
  if (!u || !await bcrypt.compare(req.body.password || '', u.password)) throw fail(401, 'Invalid email or password');
  res.json(out(u));
});
exports.access = asyncHandler(async (req, res) => {
  const phone = (req.body.phone || '').trim();
  if (!phone) throw fail(400, 'Phone number is required');
  const u = await User.findOne({ phone });
  if (!u || !u.paid) return res.json({ access: false });
  res.json({ access: true, token: signToken(u), user: u.toPublic() });
});
exports.me = (req, res) => res.json({ user: req.user.toPublic() });
