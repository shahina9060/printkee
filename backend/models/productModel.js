const mongoose = require("mongoose");

// Helper function to generate a custom productId
const generateProductId = async () => {
  const prefix = "PRD";
  const randomNum = Math.floor(100000 + Math.random() * 900000); // generates a 6-digit number
  return `${prefix}-${randomNum}`;
};

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, index:true},
  productCode: { type: String, required: true , unique: true},
  productName: { type: String, required: true },
  productDescription: { type: String, },
  productType: { type: String },
  proMinQuantity: { type: String },
  fabricType: { type: String },
  imageUrl: [{ type: String,}],
  productSize: { type: String },
  productColor: { type: String },
  productPrice: {type: Number},
  tags:{type: String},
  csvFileName: { type: String }, // Add this field to track the uploaded CSV file
  subcategory: { type: mongoose.Schema.ObjectId, ref: "Subcategory", required: true },
  capacity: {type: String},
  materialType: {type: String},

 
  
},
{ timestamps: true });

// Pre-save middleware to auto-generate productId
productSchema.pre("save", async function (next) {
  if (!this.productId) {
    let newId;
    let isUnique = false;
    
    // Loop to ensure uniqueness
    while (!isUnique) {
      newId = await generateProductId();
      const existing = await mongoose.models.Producttable.findOne({ productId: newId });
      if (!existing) isUnique = true;
    }

    this.productId = newId;
  }
  next();
});

module.exports = mongoose.model("Producttable", productSchema);
