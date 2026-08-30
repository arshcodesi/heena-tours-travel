// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const winston = require("winston");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

/* ===========================
   LOGGER
=========================== */
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, "error.log"), level: "error" }),
    new winston.transports.Console(),
  ],
});

/* ===========================
   TRUST PROXY (IMPORTANT for rate-limit + real IP)
=========================== */
app.set("trust proxy", 1);

/* ===========================
   BODY PARSERS + PERFORMANCE
=========================== */
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ===========================
   CORS (LOCAL + PRODUCTION)
   Add your production domains here
=========================== */
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // ✅ Production
  "https://hinatours.com",
  "https://www.hinatours.com",

  "https://heena-tours-travel.vercel.app",
  "https://heena-tours-travel-a5zcu9vn7-arshcodesis-projects.vercel.app",
  "https://heena-tours-travel-2qqw9bh62-arshcodesis-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server / Postman
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      // allow preview subdomains if needed (optional)
      // if (origin.endsWith(".hinatours.com")) return cb(null, true);

      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);
app.options("*", cors());

/* ===========================
   SECURITY (HELMET + CSP)
   ✅ Updated for production domains + API
=========================== */
const apiBase = process.env.API_BASE_URL || "https://api.hinatours.com";

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],

        // React/Vite needs inline sometimes; keep minimal
        scriptSrc: ["'self'", "'unsafe-inline'", "blob:"],
        styleSrc: ["'self'", "'unsafe-inline'"],

        // allow images from https + your API/uploads
        imgSrc: ["'self'", "data:", "blob:", "https:", apiBase],

        // allow frontend to call backend API
        connectSrc: ["'self'", apiBase, "https://hinatours.com", "https://www.hinatours.com", "http://localhost:5173", "http://localhost:8080"],

        fontSrc: ["'self'", "https:", "data:"],
        frameSrc: ["'self'", "https://www.google.com"], // for google map embed
      },
    },
  })
);

/* ===========================
   RATE LIMITING (PUBLIC vs ADMIN)
   ✅ Prevent 429 issues on public pages
=========================== */
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300, // public browsing (tours/hotels/properties)
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60, // admin + uploads
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/tours", publicLimiter);
app.use("/api/hotels", publicLimiter);
app.use("/api/properties", publicLimiter);
app.use("/api/reviews", publicLimiter);
app.use("/api/contact", publicLimiter);

app.use("/api/admin", adminLimiter);
app.use("/api/upload", adminLimiter);

/* ===========================
   STATIC UPLOADS
=========================== */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    crossOriginResourcePolicy: "cross-origin",
  })
);

/* ===========================
   MODELS
=========================== */
require("./models/Hotel");
require("./models/Property");

/* ===========================
   ROUTES
=========================== */
app.use("/api/tours", require("./routes/tours"));
app.use("/api/hotels", require("./routes/hotels"));
app.use("/api/properties", require("./routes/properties"));

app.use("/api/admin", require("./routes/admin"));
app.use("/api/admin/tours", require("./routes/adminTours"));
app.use("/api/admin/properties", require("./routes/adminProperties"));

app.use("/api/contact", require("./routes/contact"));
app.use("/api/reviews", require("./routes/reviews"));

app.use("/api/upload", require("./routes/upload"));

/* ===========================
   HEALTH CHECK
=========================== */
app.get("/health", (req, res) => res.json({ ok: true }));

/* ===========================
   ERROR HANDLER
=========================== */
app.use((err, req, res, next) => {
  const msg = err && err.message ? err.message : "Server error";
  logger.error(msg);

  // Better status for CORS/RateLimit errors
  if (msg.startsWith("CORS blocked:")) {
    return res.status(403).json({ error: msg });
  }

  res.status(500).json({ error: msg });
});

/* ===========================
   START SERVER
=========================== */
(async function start() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB connected");

    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  } catch (err) {
    logger.error(err?.message || err);
    process.exit(1);
  }
})();

process.on("unhandledRejection", (err) => logger.error(err?.message || err));
process.on("uncaughtException", (err) => {
  logger.error(err?.message || err);
  process.exit(1);
});
