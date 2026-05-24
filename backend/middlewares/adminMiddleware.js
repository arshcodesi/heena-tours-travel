const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  // ✅ handle both cases (some clients send Authorization with capital A)
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log("Auth header received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No Bearer token found");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token ? token.substring(0, 20) + "..." : "None");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (!decoded?.isAdmin) {
      console.log("User is not admin");
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = adminMiddleware;
