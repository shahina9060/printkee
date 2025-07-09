const express = require("express");
const router = express.Router();
const {getCategories, getCatName} = require("../controllers/categoryController")

router.get("/", getCategories);
// router.get('/catname', getCatName)

module.exports = router;
