const mongoose = require("mongoose");
require("dotenv").config();

// console.log("process.env.MONGO_URI", process.env.MONGO_URI)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};

module.exports = connectDB;
