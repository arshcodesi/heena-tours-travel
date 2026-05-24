const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: no token provided" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not configured" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin (assuming payload has `role` property)
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }

    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = requireAdmin;