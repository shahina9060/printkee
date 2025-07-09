const Banner = require("../models/imageModel");

// Upload Image & Save to Database
const uploadBanner = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    const newImage = new Banner({ imageUrl });
    await newImage.save();

    const homeSliderImages = await Banner.find().sort({ uploadedAt: -1 });
    res.status(200).json({ homeSliderImages });
  } catch (error) {
    console.error("❌ Error saving image:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Uploaded Images
const getBanner = async (req, res) => {
  try {
    const homeSliderImages = await Banner.find().sort({ uploadedAt: -1 });
    res.json({ homeSliderImages });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadBanner, getBanner };
