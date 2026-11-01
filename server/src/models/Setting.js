const { Schema, model } = require('mongoose');

const settingSchema = new Schema(
  {
    key: { type: String, unique: true, required: true },
    value: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

module.exports = model('Setting', settingSchema);
