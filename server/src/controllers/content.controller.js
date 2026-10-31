const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const fail = require('../utils/httpError');

const contentFilePath = path.join(__dirname, '../../content/pujan.html');
const videoFilePath = path.join(__dirname, '../../public/Video.mp4');

// Helper to read content template from disk
function readContentTemplate() {
  try {
    return fs.readFileSync(contentFilePath, 'utf8');
  } catch (err) {
    console.error('Failed to read content file:', err);
    return '<h2>Sacred Poojan Vidhi Content</h2><p>Content is loading...</p>';
  }
}

// User-facing DRM protected content
exports.getContent = (req, res, next) => {
  if (!req.user || !req.user.paid) {
    return next(fail(402, 'Payment required to access Poojan Vidhi Kit'));
  }

  const tpl = readContentTemplate();
  const html = tpl
    .replaceAll('{{KID}}', req.user.kalyanamId || 'KLY-MEMBER')
    .replaceAll('{{NAME}}', req.user.name || 'Bhakt');

  const hasVideoAccess = Boolean(req.user.hasVideoAccess || req.user.plan === 'video_kit');

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      success: true,
      plan: req.user.plan || 'kit',
      hasVideoAccess,
      kalyanamId: req.user.kalyanamId,
      name: req.user.name,
      html
    });
  }

  res.type('html').send(html);
};

// Authenticated Video Streaming with HTTP Range (206) Support
exports.streamVideo = async (req, res, next) => {
  try {
    let user = req.user;

    // Support query param token for HTML5 <video> elements
    if (!user && req.query.token) {
      try {
        const decoded = jwt.verify(req.query.token, env.jwtSecret);
        user = await User.findById(decoded.id);
      } catch (err) {
        return res.status(401).send('Invalid or expired video session token');
      }
    }

    if (!user || !user.paid) {
      return res.status(403).send('Active paid plan is required to access the sacred puja video');
    }

    if (!fs.existsSync(videoFilePath)) {
      return res.status(404).send('Puja video file is not found on server');
    }

    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res.status(416).send(`Requested range not satisfiable\n${start} >= ${fileSize}`);
        return;
      }

      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoFilePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private'
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private'
      };
      res.writeHead(200, head);
      fs.createReadStream(videoFilePath).pipe(res);
    }
  } catch (err) {
    next(err);
  }
};

// Admin Content Editor APIs
exports.getAdminContent = (req, res) => {
  const content = readContentTemplate();
  res.json({ success: true, content });
};

exports.updateAdminContent = (req, res) => {
  const { content } = req.body;
  if (typeof content !== 'string') {
    return res.status(400).json({ error: 'Content must be an HTML string' });
  }

  try {
    fs.writeFileSync(contentFilePath, content, 'utf8');
    res.json({ success: true, message: 'Puja Vidhi content updated successfully' });
  } catch (err) {
    console.error('Failed to write content file:', err);
    res.status(500).json({ error: 'Failed to save content on server' });
  }
};
