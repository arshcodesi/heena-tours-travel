const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

contactSchema.index({ email: 1 });  // For spam prevention

module.exports = mongoose.model('Contact', contactSchema);