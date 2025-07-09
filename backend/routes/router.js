const express = require("express")
const router = express.Router()

const categoryRoute = require("./categoryRoute")
const emailRoute = require("./emailRoute")
const imageRoute = require("./imageRoute")
const productRoute = require("./productRoute")
const subCategoryRoute = require("./subCategoryRoute")
const authRoute = require("./authRoute")
const customProductRoute = require('./customProductRoute')

router.use("/api", imageRoute);                // /api/upload, /api/banner
router.use("/api", emailRoute);                 // /api/send-email
router.use("/api/category", categoryRoute);    // /api/category/
router.use("/api/subcategories", subCategoryRoute); // /api/subcategories/:categoryId
router.use("/api/products", productRoute);     // /api/products/:subcategoryId, /api/products/upload/products

router.use("/api",authRoute)
router.use("/api", customProductRoute)



module.exports = router