const mongoose = require("mongoose");  // Add this import

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: false },  // Optional price
  images: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);