const mongoose = require("mongoose");
// Helper function to generate a custom productId
const generateProductId = async () => {
  const prefix = "PRD";
  const randomNum = Math.floor(100000 + Math.random() * 900000); // generates a 6-digit number
  return `${prefix}-${randomNum}`;
};

const customProductSchema = new mongoose.Schema({
  productId: { type: String, unique: true },
  base: { type: String },
  crown: { type: String },
  peak: { type: String },
  sandwich: { type: String },
  baseColor: { type: String },
  topbutton: { type: String },
  crownColor: { type: String },
  sandwichColor: { type: String },
  peakColor: { type: String },
  topbuttonColor: { type: String },
  fabricType: { type: String },
  printType: { type: String },
  quantity: { type: Number },
  text: [],
  logo: {
    data: Buffer,
    contentType: String
  },
  // ==== t-shirt
  front: {
  logo: { data: Buffer, contentType: String },
  text: [ /* array of text overlays */ ]
},
back: {
  logo: { data: Buffer, contentType: String },
  text: [ /* array of text overlays */ ]
},
sleeves: {
  logo: { data: Buffer, contentType: String },
  text: [ /* array of text overlays */ ]
},

  // companyName:{type: String},
  // location: {type: String},
  phone: {type: String,require:true},


   // noteBook & diary
   productColor: { type: String },
    materialType: {type: String},
   quantity: {type: String},
    notebookSize: {type: String},
    lamination: {type: String},
    noOfPages: {type: String},
    paperType: {type: String},
    innerPagePrintType: {type: String},
    bindingType: {type: String},
},{timestamps:true});


customProductSchema.pre("save", async function (next) {
  if (!this.productId) {
    let newId;
    let isUnique = false;

    // Loop to ensure uniqueness
    while (!isUnique) {
      newId = await generateProductId();
      const existing = await mongoose.models.Customproduct.findOne({
        productId: newId,
      });
      if (!existing) isUnique = true;
    }

    this.productId = newId;
  }
  next();
});

module.exports = mongoose.model("Customproduct", customProductSchema);
