const express = require("express");
const Tour = require("../models/Tour");

const router = express.Router();

/**
 * PUBLIC: List active tours
 * GET /api/tours?limit=50
 * Returns an array (keeps backward compatibility with your current response)
 */
router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 100);

    // Only active tours
    const tours = await Tour.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.json(tours);
  } catch (err) {
    return next(err);
  }
});

/**
 * PUBLIC: Get one active tour
 * GET /api/tours/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour || tour.isActive !== true) {
      return res.status(404).json({ error: "Tour not found" });
    }

    return res.json(tour);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;