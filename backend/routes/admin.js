const express = require('express');
const router = express.Router();

// Simple old version: No real auth, just returns success
router.post('/login', (req, res) => {
  // Always return success (for demo)
  res.json({ message: 'Login successful' });
});

module.exports = router;