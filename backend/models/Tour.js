const mongoose = require("mongoose");

// Price sub-schema for pricing details
const priceSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true }, // e.g., "Bus"
    amount: { type: Number, required: true, min: 0 },    // e.g., 800
    unit: { type: String, default: "", trim: true },     // e.g., "per head"
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    // Tour name: unique and trimmed
    name: { type: String, required: true, trim: true, unique: true },

    // Duration with time text, e.g., "Two Day – 9:30 AM"
    durationText: { type: String, required: true, trim: true },

    // Transport description, e.g., "Bus or Taxi", optional
    transportText: { type: String, default: "", trim: true },

    // List of places covered by tour, must have at least one
    covers: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "covers must have at least 1 place",
      },
    },

    // Optional list of inclusions (lodging, boarding, etc.)
    includes: { type: [String], default: [] },

    // Prices defined as array of embedded priceSchema objects
    prices: { type: [priceSchema], default: [] },

    // Optional notes, e.g., "Safari Included"
    notes: { type: String, default: "", trim: true },

    // Map search query or embedded map URL
    mapQuery: { type: String, default: "", trim: true },
    mapEmbed: { type: String, default: "", trim: true },

    // Image URL for the tour (added for unique images)
    imageUrl: { type: String, default: "", trim: true },

    // Active flag for tours
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } // adds createdAt and updatedAt timestamps
);

// Export the model,
// use existing compiled model if it exists (fixes OverwriteModelError in dev)
module.exports = mongoose.models.Tour || mongoose.model("Tour", tourSchema);