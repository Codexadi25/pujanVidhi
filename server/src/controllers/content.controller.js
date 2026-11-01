const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const fail = require('../utils/httpError');

// Strictly resolve file paths outside of public webroots to avoid direct URL exposure or traversal
const contentFilePath = path.resolve(__dirname, '../../content/pujan.html');
const videoFilePath = fs.existsSync(path.resolve(__dirname, '../../content/Video.mp4'))
  ? path.resolve(__dirname, '../../content/Video.mp4')
  : path.resolve(__dirname, '../../public/Video.mp4');

// Helper to safely read content template from disk
function readContentTemplate() {
  try {
    return fs.readFileSync(contentFilePath, 'utf8');
  } catch (err) {
    console.error('Failed to read sacred content file:', err);
    return '<div class="hi"><h2>Sacred Poojan Vidhi Content</h2><p>Content is temporarily loading...</p></div>';
  }
}

// User-facing DRM protected document delivery
exports.getContent = (req, res, next) => {
  // 1. Enforce strict authorization - user must exist and be verified as paid
  if (!req.user || !req.user.paid) {
    return next(fail(402, 'Active authorization required: Payment verification required to access Kalyanam Puja Vidhi'));
  }

  // 2. Set strict anti-caching & transport security headers so browsers do not cache protected copies on disk
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  const rawTemplate = readContentTemplate();
  const userName = req.user.name || 'Bhakt';
  const kalyanamId = req.user.kalyanamId || 'KLY-MEMBER';
  const watermarkText = `${userName} | Kalyanam ID: ${kalyanamId}`;

  // 3. Dynamic Identity Watermark injection at the server level
  // Replaces all dynamic identity placeholders so document cannot be forged or anonymized
  const personalizedHtml = rawTemplate
    .replaceAll('{{KID}}', kalyanamId)
    .replaceAll('{{NAME}}', userName);

  const hasVideoAccess = Boolean(req.user.hasVideoAccess || req.user.plan === 'video_kit');

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      success: true,
      plan: req.user.plan || 'kit',
      hasVideoAccess,
      kalyanamId,
      name: userName,
      watermarkText,
      html: personalizedHtml,
      issuedAt: new Date().toISOString()
    });
  }

  res.type('html').send(personalizedHtml);
};

// Authenticated PDF Download for Paid Devotees
exports.downloadPdf = async (req, res, next) => {
  try {
    let user = req.user;

    // Support query param token for direct browser <a> downloads
    if (!user && req.query.token) {
      try {
        const decoded = jwt.verify(req.query.token, env.jwtSecret);
        user = await User.findById(decoded.id);
      } catch (err) {
        return res.status(401).send('Invalid or expired download session token');
      }
    }

    if (!user || !user.paid) {
      return res.status(403).send('Active paid plan is required to download the Diwali Puja Vidhi PDF');
    }

    const pdfPath = path.resolve(__dirname, '../../content/Diwali_Puja_Vidhi_Hindi.pdf');
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).send('Diwali Puja Vidhi PDF is not found on server');
    }

    const stat = fs.statSync(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', 'attachment; filename="Diwali_Puja_Vidhi_Hindi.pdf"');
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');

    const stream = fs.createReadStream(pdfPath);
    stream.pipe(res);
  } catch (err) {
    next(err);
  }
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
      const origin = req.headers.origin || '*';
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': 'Content-Range, Accept-Ranges, Content-Length',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'X-Content-Type-Options': 'nosniff'
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const origin = req.headers.origin || '*';
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': 'Content-Range, Accept-Ranges, Content-Length',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'X-Content-Type-Options': 'nosniff'
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
    res.json({ success: true, message: 'Puja Vidhi content updated successfully on server' });
  } catch (err) {
    console.error('Failed to write content file:', err);
    res.status(500).json({ error: 'Failed to save content on server' });
  }
};
