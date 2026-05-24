require("dotenv").config();
const mongoose = require("mongoose");
const Property = require("./models/Property");

const properties = [
  {
    name: "Property In Nainital",
    location: "Nainital, Uttarakhand",
    description: "A stunning luxury villa with panoramic mountain views.",
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"],
    isActive: true,
  },
  {
    name: "Cozy Cottage in Jim Corbett",
    location: "Jim Corbett National Park, Uttarakhand",
    description: "A charming cottage nestled in the forest.",
    images: ["/uploads/cottage1.jpg", "/uploads/cottage2.jpg"],
    isActive: true,
  },
];

async function seedProperties() {
  try {
    console.log("Connecting to DB:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    //  FORCE CLEAN DATABASE
    await Property.deleteMany({});
    console.log("Old properties deleted");

    await Property.insertMany(properties);
    console.log("Properties seeded successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

seedProperties();