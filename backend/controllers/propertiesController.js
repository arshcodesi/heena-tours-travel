// controllers/propertiesController.js

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Property = require("../models/Property");

// ================= GET ALL PROPERTIES =================
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isActive: true });
    return res.json(properties);
  } catch (error) {
    console.error("GET PROPERTIES ERROR:", error);
    return res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// ================= GET PROPERTY BY ID =================
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid property id" });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    return res.json(property);
  } catch (error) {
    console.error("GET PROPERTY ERROR:", error);
    return res.status(500).json({ error: "Failed to fetch property" });
  }
};

// ================= ADD PROPERTY =================
exports.addProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    return res.status(201).json(property);
  } catch (error) {
    console.error("ADD PROPERTY ERROR:", error);
    return res.status(400).json({ error: error.message });
  }
};

// ================= UPDATE PROPERTY =================
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid property id" });
    }

    const property = await Property.findByIdAndUpdate(id, req.body, { new: true });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    return res.json(property);
  } catch (error) {
    console.error("UPDATE PROPERTY ERROR:", error);
    return res.status(400).json({ error: error.message });
  }
};

// ================= DELETE PROPERTY =================
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid property id" });
    }

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    return res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("DELETE PROPERTY ERROR:", error);
    return res.status(500).json({ error: "Failed to delete property" });
  }
};

// ================= ADD / UPDATE PROPERTY IMAGES =================
// Route: PUT /api/properties/images/:id
// Body: { images: ["url1", "url2"] }
exports.updatePropertyImages = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { images } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property id" });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "images must be a non-empty array" });
    }

    // ✅ APPEND MULTIPLE IMAGES (does not overwrite old ones)
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { $push: { images: { $each: images } } },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    return res.json(property);
  } catch (error) {
    console.error("UPDATE PROPERTY IMAGES ERROR:", error);
    return res.status(500).json({ error: "Failed to update property images" });
  }
};

// ================= DELETE SINGLE IMAGE =================
// Route: DELETE /api/properties/delete-image/:id
// Body: { imageUrl: "..." }
exports.deletePropertyImage = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { imageUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property id" });
    }

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl required" });
    }

    const property = await Property.findByIdAndUpdate(
      propertyId,
      { $pull: { images: imageUrl } },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // OPTIONAL: delete physical file from uploads folder
    try {
      const imagePath = path.join(__dirname, "..", "uploads", path.basename(imageUrl));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image file deleted:", imagePath);
      }
    } catch (fileErr) {
      console.warn("File delete warning:", fileErr.message);
    }

    return res.json({
      message: "Image deleted successfully",
      images: property.images,
    });
  } catch (error) {
    console.error("DELETE IMAGE ERROR:", error);
    return res.status(500).json({ error: "Failed to delete image" });
  }
};
