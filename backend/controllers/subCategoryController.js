const Subcategory = require("../models/subCategoryModel");

const getSubCategory = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subcategories", error });
    }
};

const getSubCategoryById = async (req, res) => {
     try {
        const subcategories = await Subcategory.find({ category: req.params.categoryId });
        res.json(subcategories);
      } catch (error) {
        res.status(500).json({ message: "Error fetching subcategories", error });
      }
};

module.exports = { getSubCategory, getSubCategoryById };
