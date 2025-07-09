const express = require("express");
const router = express.Router();
const {getSubCategoryById} = require("../controllers/subCategoryController")

router.get("/:categoryId", getSubCategoryById);

module.exports = router;
