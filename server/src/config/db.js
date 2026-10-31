const mongoose = require('mongoose'), env = require('./env');
module.exports = () => mongoose.connect(env.mongoUri);
