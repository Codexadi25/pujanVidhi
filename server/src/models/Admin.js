const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
  username: { type: String, default: 'admin', unique: true },
  password: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

// Compare candidate password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  if (!candidatePassword) return false;
  // If stored password is a bcrypt hash
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return bcrypt.compare(candidatePassword, this.password);
  }
  // Fallback for initial plain-text setup
  return this.password === candidatePassword;
};

module.exports = model('Admin', adminSchema);
