const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");

router.get("/:hotelId", reviewsController.getReviewsByHotel);
router.post("/", reviewsController.addReview);

module.exports = router;