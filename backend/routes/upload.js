// routes/upload.js

const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload"); // multer middleware
const adminMiddleware = require("../middlewares/adminMiddleware");

// ✅ PROPERTY IMAGES (Protected)
// POST /api/upload/property-images
router.post(
  "/property-images",
  adminMiddleware,
  upload.array("images", 10),
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
      return res.json({ imageUrls });
    } catch (error) {
      console.error("Property upload error:", error);
      return res.status(500).json({ error: "Upload failed" });
    }
  }
);

// ✅ HOTEL IMAGES (Protected)
// POST /api/upload/hotel-images
router.post(
  "/hotel-images",
  adminMiddleware,
  upload.array("images", 10),
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
      return res.json({ imageUrls });
    } catch (error) {
      console.error("Hotel upload error:", error);
      return res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
