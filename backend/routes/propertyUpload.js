const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed!'), false);
  }
});

router.post('/property-images', upload.array('images', 10), (req, res) => {
  if(!req.files) {
    return res.status(400).json({error: 'No files uploaded'});
  }
  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  res.json({imageUrls});
});

module.exports = router;