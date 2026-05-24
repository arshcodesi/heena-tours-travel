const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "", trim: true },
    starRating: { type: Number, min: 1, max: 5, default: 3 },
    amenities: { type: [String], default: [] },
    roomTypes: [
      {
        type: { type: String, required: true, trim: true },
        
        images: { type: [String], default: [] },
        _id: false,
      },
    ],
    mapEmbed: { type: String, default: "", trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);