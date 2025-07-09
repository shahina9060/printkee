const mongoose = require("mongoose");

const PropductEmailSchema = new mongoose.Schema({
    crown:  String,
    sandwich:  String,
    peak: String,
    topbutton:  String,
    crownColor:  String,
    sandwichColor:  String,
    peakColor:  String,
    topbuttonColor:  String,
    fabricType:  String,
    printType:  String,
    quantity: Number,
    logo:  String,
    sentAt: { type: Date, default: Date.now },
  });
  
  const Productemail = mongoose.model("Productemail", PropductEmailSchema);
  module.exports = Productemail