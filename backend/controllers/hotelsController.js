const Hotel = require("../models/Hotel");

// Get all active hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ isActive: true });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

// Get single hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
};

// Add new hotel (admin only)
exports.addHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update hotel (admin only)
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update room images for a hotel (admin only)
exports.updateRoomImages = async (req, res) => {
  try {
    const { hotelId, roomType, images } = req.body;

    if (!hotelId || !roomType || !Array.isArray(images)) {
      return res.status(400).json({ error: "Missing data" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });

    const room = hotel.roomTypes.find(r => r.type === roomType);
    if (!room) return res.status(404).json({ error: "Room type not found" });

    room.images = images;

    await hotel.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete hotel (admin only)
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
};