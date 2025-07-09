const express = require("express");
const { sendEmail, sendProductEmail } = require("../controllers/emailController");

const router = express.Router();

// Define route for sending email
router.post("/send-email", sendEmail);
router.post("/send-productemail", sendProductEmail);

module.exports = router;
