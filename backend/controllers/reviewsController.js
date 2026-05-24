const Review = require("../models/Review");

exports.getReviewsByHotel = async (req, res) => {
  try {
    const reviews = await Review.find({ hotelId: req.params.hotelId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

exports.addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};