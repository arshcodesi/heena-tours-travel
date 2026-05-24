const express = require("express");
const router = express.Router();
const hotelsController = require("../controllers/hotelsController");

// Public routes
router.get("/", hotelsController.getHotels);
router.get("/:id", hotelsController.getHotelById);

// ✅ MUST EXIST (this is what your frontend calls)
router.put("/room-images", hotelsController.updateRoomImages);

// Admin routes (optional)
router.post("/", hotelsController.addHotel);
router.put("/:id", hotelsController.updateHotel);
router.delete("/:id", hotelsController.deleteHotel);

module.exports = router;
