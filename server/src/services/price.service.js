const Setting = require('../models/Setting'), env = require('../config/env');
exports.getPrice = async () => (await Setting.findOne({ key: 'price' }))?.value ?? env.defaultPrice;
exports.setPrice = v => Setting.findOneAndUpdate({ key: 'price' }, { value: v }, { upsert: true, new: true });
