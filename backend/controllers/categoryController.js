const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
     try {
        const categories = await Category.find();
        res.json(categories);
      } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
      }
};

// const getCatName = async () => {
//   try {
//     const _id = req.body;

//     // Use findOne and await it
//     const cat = await Category.findOne({ _id });

//     if (!cat) {
//       console.log("Category not found.");
//       return;
//     }

//     console.log("catName:", cat.name);
//   } catch (error) {
//     console.error("Error fetching category:", error);
//   }
// };


module.exports = { getCategories };


// Add a new category (optional)
// exports.addCategory = async (req, res) => {
//     try {
//         const { id, name, imageUrl } = req.body;
//         const newCategory = new Category({ id, name, imageUrl });
//         await newCategory.save();
//         res.status(201).json({ message: "Category added successfully", category: newCategory });
//     } catch (err) {
//         res.status(500).json({ error: "Error adding category: " + err.message });
//     }
// };
