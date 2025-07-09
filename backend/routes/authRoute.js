const express = require("express");
const {authLogin, logoutAdmin} = require("../controllers/authController");
const authMiddleware = require("../middlewares/adminAuth");
// const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/login", authLogin);
router.post("/logout", logoutAdmin);

// Protected routes
router.get("/admin/check-auth", authMiddleware, (req, res) => {
  res.json({ message: "Protected admin data" });
});
module.exports = router;
