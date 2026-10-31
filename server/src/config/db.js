const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

// Set public reliable DNS servers to resolve MongoDB Atlas SRV records properly on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (err) {
  console.warn('DNS server override failed:', err.message);
}

module.exports = async () => {
  try {
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Primary MongoDB connection failed:', err.message);

    // Fallback to local MongoDB if primary Atlas connection fails
    if (env.mongoUri.includes('mongodb+srv://')) {
      console.log('Attempting fallback to local MongoDB instance...');
      try {
        await mongoose.connect('mongodb://127.0.0.1:27017/diwali_pujan', {
          serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to fallback local MongoDB instance');
        return;
      } catch (localErr) {
        console.error('Fallback local MongoDB connection also failed:', localErr.message);
      }
    }
    throw err;
  }
};
