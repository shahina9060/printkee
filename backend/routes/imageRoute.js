const express = require("express");
const router = express.Router();
const { uploadBanner, getBanner } = require("../controllers/imageController");
const {upload} = require("../middlewares/middleware")

// Routes
router.post("/upload", upload.single("banner"), uploadBanner);
router.get("/banner", getBanner);

module.exports = router;
