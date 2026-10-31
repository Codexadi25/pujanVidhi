const env = require('./src/config/env');
const connectDB = require('./src/config/db');
const app = require('./src/app');
connectDB().then(() => app.listen(env.port, () => console.log('API up on ' + env.port)));
