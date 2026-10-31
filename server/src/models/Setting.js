const { Schema, model } = require('mongoose');
module.exports = model('Setting', new Schema({ key: { type: String, unique: true }, value: Number }));
