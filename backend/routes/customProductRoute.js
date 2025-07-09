const express = require("express")
const {customProductPostTshirt,customProductPost} = require("../controllers/customProductController")
const router = express.Router()
// const {upload} = require("../middlewares/middleware")

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.post("/custom-product",upload.single('logo'), customProductPost)
router.post("/custom-product",upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "customPdf", maxCount: 1 },
  ]), customProductPost)


router.post("/custom-product-tshirt",upload.fields([
    { name: "frontLogo", maxCount: 1 },
    { name: "backLogo", maxCount: 1 },
    { name: "sleevesLogo", maxCount: 1 },
    { name: "customPdf", maxCount: 1 }, // include this too!
  ]), customProductPostTshirt)
module.exports = router