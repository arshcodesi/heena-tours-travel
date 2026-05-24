const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN_EMAIL = 'admin@property.com';
const ADMIN_PASS_HASH = bcrypt.hashSync('PropAdmin123!', 10);

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASS_HASH)) {
    const token = jwt.sign(
      { email, isAdmin: true, role: 'property' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;