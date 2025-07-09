const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: "Category", required: true },
});

module.exports = mongoose.model("Subcategory", subCategorySchema);
