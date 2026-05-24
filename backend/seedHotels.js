require("dotenv").config();
const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");  // Make sure this path is correct!

const hotels = [
  {
    name: "HOTEL ARSH",
    location: "BHOWALI (NAINITAL)",
    description: "A comfortable hotel in Bhowali, offering scenic views of Nainital with modern amenities.",
    imageUrl:
      "uploads/ar.JPG",
    starRating: 4,
    
    maxPrice: 6000,
    minPrice: 3000,
    amenities: ["WiFi", "Parking", "AC", "Breakfast", "Room Service"],
    roomTypes: [
      {
        type: "Standard",
        
        imageUrl:
          "https://images.unsplash.com/photo-1501117716987-c8e56bce1aa6?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "Deluxe",
        
        imageUrl:
          "https://images.unsplash.com/photo-1560448070-9e0d1121e2f8?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "Suite",
        
        imageUrl:
          "https://images.unsplash.com/photo-1560449647-cdaa32eff85c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.1234!2d79.4567!3d29.3789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjk%C2%B037OCc5NC4wIk4gNzklQzIlQjA0Nic1My4yIkU!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin",
    isActive: true,
  },
  {
    name: "GLOBAL RESIDENCY",
    location: "JULYCOTE NAINITAL",
    description:
      "A premium residency in July Cote, Nainital, with luxurious rooms and lake views.",
    imageUrl:
      "/uploads/gl.JPG",
    starRating: 5,
    
    maxPrice: 9000,
    minPrice: 4500,
    amenities: ["WiFi", "Parking", "AC", "Breakfast", "Swimming Pool", "Gym"],
    roomTypes: [
      {
        type: "Deluxe",
        
        imageUrl:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "Executive",
        
        imageUrl:
          "https://images.unsplash.com/photo-1505692794403-2e8a5a0a3ff4?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "Presidential Suite",
        
        imageUrl:
          "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.5678!2d79.5678!3d29.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjk%C2%B035Nic4NC4wIk4gNzklQzIlQjA1Nic1Ny44IkU!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin",
    isActive: true,
  },
  {
    name: "CORPORATE TIGER HUNTS",
    location: "RAMNAGAR (GIM CORBETTE NATIONAL PARK)",
    description:
      "An adventure-focused hotel near Jim Corbett National Park, ideal for wildlife enthusiasts.",
    imageUrl:
      "/uploads/corbet.jpeg",
    starRating: 4,
    
    maxPrice: 7500,
    minPrice: 3500,
    amenities: ["WiFi", "Parking", "AC", "Breakfast", "Safari Tours", "Guided Walks"],
    roomTypes: [
      {
        type: "Standard",
        
        imageUrl:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "Deluxe",
        
        imageUrl:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "Jungle View Suite",
        
        imageUrl:
          "https://images.unsplash.com/photo-1505692794403-2e8a5a0a3ff4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.9012!2d78.9012!3d29.9012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjk%C2%B039MDEnMTIuMCJOIDc4wrA1NCcwMS4yIkU!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin",
    isActive: true,
  },
];

async function run() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
  await mongoose.connect(process.env.MONGO_URI);
  await Hotel.deleteMany({});
  await Hotel.insertMany(hotels);
  console.log("Hotels seeded successfully");
  await mongoose.disconnect();
}

run().catch(console.error);