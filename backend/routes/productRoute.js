// const Product = require("../models/productModel")
const express = require("express");
const router = express.Router();
const {getProductById, uploadProducts, searchProduct, sideImages, uploadProductCSV, updateProduct, updateProductWithProductCode, relatedProduct} = require("../controllers/productController")
const {upload} = require("../middlewares/middleware")



router.post("/updateProduct", updateProduct)
router.put("/updateData/", upload.array("imageUrl",3), updateProductWithProductCode)
router.get('/search', searchProduct);
router.get("/:subcategoryId", getProductById);
router.post("/upload/products", upload.array("imageUrl",3), uploadProducts)
router.get("/side-images/:productId",sideImages)

router.get("/relatedProduct/display/:productId",relatedProduct)

// const { uploadProductCSV } = require("../controllers/uploadProductCSV");

router.post("/upload-csv", upload.single("file"), uploadProductCSV);


module.exports = router;


// router.get('/search/:keyword', searchProduct);



// module.exports = router;


