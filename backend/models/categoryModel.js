const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  id: {type:String}
});

module.exports = mongoose.model("Category", categorySchema);
