const fs = require('fs'), path = require('path'), fail = require('../utils/httpError');
const tpl = fs.readFileSync(path.join(__dirname, '../../content/pujan.html'), 'utf8');

exports.getContent = (req, res, next) => {
  if (!req.user.paid) return next(fail(402, 'Payment required to access Poojan Vidhi Kit'));

  const html = tpl
    .replaceAll('{{KID}}', req.user.kalyanamId || 'KLY-MEMBER')
    .replaceAll('{{NAME}}', req.user.name || 'Bhakt');

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      success: true,
      plan: req.user.plan || 'kit',
      hasVideoAccess: req.user.plan === 'video_kit',
      kalyanamId: req.user.kalyanamId,
      name: req.user.name,
      html
    });
  }

  res.type('html').send(html);
};
