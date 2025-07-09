const mongoose = require("mongoose");
require("dotenv").config();
const Category = require("./models/categoryModel");
const SubCategory = require("./models/subCategoryModel");
const Product = require("./models/productModel");

const categories = require("./Data/data.js");
const subcategories = require("./Data/subcategorydata");
const products = require("./Data/productdata");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Failed:", err));

const seedDatabase = async () => {
  try {
    // Delete existing data to avoid duplicates
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data.");

    const categoryDocs = await Category.insertMany(categories.map(category => ({
        name: category.name,
        imageUrl: category.imageUrl || "",
        hoverImageUrl: category.hoverImageUrl || ""
    })));
    console.log("Categories inserted!");

    const subcategoryDocs = [];
    for (const [categoryName, subs] of Object.entries(subcategories)) {
        const category = categoryDocs.find(c => c.name === categoryName);
        if (!category) continue;

        const insertedSubcategories = await SubCategory.insertMany(subs.map(sub => ({
            name: sub.name,
            imageUrl: sub.imageUrl,
            category: category._id,
        })));
        subcategoryDocs.push(...insertedSubcategories);
    }
    console.log("Subcategories inserted!");

    // for (const [categoryName, subcatMap] of Object.entries(products)) {
    //     for (const [subcatName, items] of Object.entries(subcatMap)) {
    //         const subcategory = subcategoryDocs.find(s => s.name === subcatName);
    //         if (!subcategory) continue;

    //         await Product.insertMany(items.map(item => ({
    //             name: item.name,
    //             imageUrl: item.imageUrl,
    //             subcategory: subcategory._id,  // 🔹 Fixed field name
    //         })));
    //     }
    // }

for (const [categoryName, subcatMap] of Object.entries(products)) {
  for (const [subcatName, items] of Object.entries(subcatMap)) {
    const subcategory = subcategoryDocs.find(s => s.name === subcatName);
    if (!subcategory) continue;

    await Product.insertMany(items.map(item => ({
      productCode: item.productCode || `CODE-${Math.floor(Math.random() * 1000000)}`,
      productName: item.productName || item.name || "Unnamed Product",
      productDescription: item.productDescription || "",
      productType: item.productType || "",
      proMinQuantity: item.proMinQuantity || "",
      fabricType: item.fabricType || "",
      imageUrl: item.imageUrl || [],
      productSize: item.productSize || "",
      productColor: item.productColor || "",
      productPrice: item.productPrice || 0,
      tags: item.tags || "",
      csvFileName: item.csvFileName || "",
      capacity: item.capacity || "",
      materialType: item.materialType || "",
      subcategory: subcategory._id
    })));
  }
}


      
    console.log("Products inserted!");

    mongoose.connection.close();
    console.log("Database seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Run the script
// seedDatabase();
module.exports = seedDatabase;
