exports.ping = (req, res) => res.json({ status: 1, uptime: process.uptime() });
