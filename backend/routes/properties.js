const express = require("express");
const router = express.Router();

const propertiesController = require("../controllers/propertiesController");
const adminMiddleware = require("../middlewares/adminMiddleware");

// IMAGE ROUTES FIRST ✅
router.put("/images/:id", adminMiddleware, propertiesController.updatePropertyImages);
router.delete("/delete-image/:id", adminMiddleware, propertiesController.deletePropertyImage);

// NORMAL ROUTES ✅
router.get("/", propertiesController.getProperties);
router.get("/:id", propertiesController.getPropertyById);

router.post("/", adminMiddleware, propertiesController.addProperty);
router.put("/:id", adminMiddleware, propertiesController.updateProperty);
router.delete("/:id", adminMiddleware, propertiesController.deleteProperty);

module.exports = router;
