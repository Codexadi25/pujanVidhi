exports.ping = (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // If client explicitly requests text/plain
  if (req.headers.accept && req.headers.accept === 'text/plain') {
    return res.status(200).send('1');
  }

  // Standard response returns 1 in status and ping fields
  res.status(200).json({ status: 1, ping: 1, message: 'pong', uptime: process.uptime() });
};
