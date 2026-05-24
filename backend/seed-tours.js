require("dotenv").config();
const mongoose = require("mongoose");
const Tour = require("./models/Tour");

const tours = [
  {
    name: "KAUSANI",
    durationText: "Two Day – 9:30 AM",
    transportText: "Bus or Taxi",
    covers: [
      "Bhowali",
      "Kainchi Temple",
      "Almora",
      "Kausani (Night Halt)",
      "Kalika Temple",
      "Golf Link",
      "Ranikhet",
      "Kherakhan Temple"
    ],
    prices: [
      { label: "Bus", amount: 800, unit: "per head" },
      { label: "Small Car", amount: 4000, unit: "" },
      { label: "Qualis", amount: 6000, unit: "" },
      { label: "Sumo", amount: 5000, unit: "" }
    ],
    includes: [
      "Lodging",
      "Boarding",
      "Tea",
      "Dinner",
      "Breakfast",
      "Toll Taxes",
      "Guide",
      "Transport"
    ],
    mapQuery: "Kausani, Uttarakhand",
    imageUrl: "https://images.unsplash.com/photo-1667029839334-73226679baca?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Mountain view for Kausani
    isActive: true
  },
  {
    name: "RANIKHET",
    durationText: "One Day – 10:00 AM",
    transportText: "Taxi",
    covers: [
      "Bhowali",
      "Kainchi Temple",
      "Ranikhet",
      "Kalika Temple",
      "Golf Link",
      "Haida Khan Temple"
    ],
    prices: [
      { label: "Bus", amount: 300, unit: "per head" },
      { label: "Small Car", amount: 1900, unit: "" },
      { label: "Qualis", amount: 3000, unit: "" },
      { label: "Sumo", amount: 2500, unit: "" }
    ],
    mapQuery: "Ranikhet, Uttarakhand",
    imageUrl: "https://images.unsplash.com/photo-1742913142208-6e20840da691?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Hill station view for Ranikhet
    isActive: true
  },
  {
    name: "JIM CORBETT PARK",
    durationText: "One Day",
    transportText: "Wildlife Tour",
    covers: ["Kaladhungi", "Corbett Museum", "Corbett Fall", "Ramnagar", "Laldhang"],
    prices: [
      { label: "Indian", amount: 1300, unit: "" },
      { label: "Foreigner", amount: 1600, unit: "" }
    ],
    notes: "Safari Included",
    mapQuery: "Jim Corbett National Park",
    imageUrl: "https://images.unsplash.com/photo-1669021820358-317111184ede?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Wildlife/forest view for Corbett
    isActive: true
  },
  {
    name: "BINSAR",
    durationText: "One Day",
    transportText: "",
    covers: ["Bhowali", "Kainchi Temple", "Almora", "Binsar"],
    mapQuery: "Binsar, Uttarakhand",
    imageUrl: "https://images.unsplash.com/photo-1647071512733-f0760e6c8446?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Scenic hill view for Binsar
    isActive: true
  },
  {
    name: "LAKE TOUR",
    durationText: "Half Day",
    transportText: "",
    covers: ["Bhowali", "Bhimtal", "Sattal", "Naukuchiatal", "Hanumangarh"],
    mapQuery: "Bhimtal, Uttarakhand",
    imageUrl: "https://images.unsplash.com/photo-1663128687086-995ac1a9cea6?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Lake view for Lake Tour
    isActive: true
  },
  {
    name: "MUKTESHWAR",
    durationText: "One Day",
    transportText: "",
    covers: ["Bhowali", "Gagar", "Ramgarh", "Mukteshwar", "Ghorakhal Temple"],
    mapQuery: "Mukteshwar, Uttarakhand",
    imageUrl: "https://images.unsplash.com/photo-1625830367488-d39bdc4ab1ab?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Temple/mountain view for Mukteshwar
    isActive: true
  },
  {
    name: "HIMALAYA DARSHAN",
    durationText: "2.5 Hours",
    transportText: "",
    covers: ["Cave Garden", "Bara Pathar", "Himalaya Darshan", "Lake View Point", "Tanki Band"],
    mapQuery: "Himalaya Darshan Point, Nainital",
    imageUrl: "https://images.unsplash.com/photo-1712175847805-8010d80e050a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Himalaya view for Himalaya Darshan
    isActive: true
  },
  {
    name: "NAINITAL DARSHAN",
    durationText: "Full Day",
    transportText: "",
    covers: ["Kilbury", "Zoo", "Raj Bhawan", "Hanumangarh", "Waterfall", "Sunset Point"],
    mapQuery: "Nainital, Uttarakhand",
    imageUrl: "https://images.unsplash.com/photo-1706468630738-b0ded0c5fc25?q=80&w=2398&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // City/lake view for Nainital Darshan
    isActive: true
  }
];

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing in backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  let upserted = 0;
  for (const t of tours) {
    // Upsert by name so you can run script multiple times safely
    await Tour.updateOne(
      { name: t.name },
      { $set: t },
      { upsert: true }
    );
    upserted += 1;
  }

  console.log(`✅ Seed complete. Upserted ${upserted} tours.`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error("❌ Seed failed:", err);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});