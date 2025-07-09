const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    requirements: String,
    sentAt: { type: Date, default: Date.now },
  });
  
  const Email = mongoose.model("Email", EmailSchema);
  module.exports = Email