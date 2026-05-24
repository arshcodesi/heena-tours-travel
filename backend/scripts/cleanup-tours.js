require("dotenv").config();
const mongoose = require("mongoose");
const Tour = require("../models/Tour");

const allowedNames = new Set([
  "KAUSANI",
  "RANIKHET",
  "JIM CORBETT PARK",
  "BINSAR",
  "LAKE TOUR",
  "MUKTESHWAR",
  "HIMALAYA DARSHAN",
  "NAINITAL DARSHAN"
]);

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const result = await Tour.deleteMany({
    name: { $nin: Array.from(allowedNames) }
  });

  console.log(`✅ Cleanup complete. Deleted ${result.deletedCount} tours.`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});