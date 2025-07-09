const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const authLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Auth.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "2h", // session active for 1 hour
      });
  
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 3600000, // 1 hour in milliseconds
      });
      console.log("token",token)
    res.json({ message: "Login successful", success: true });

  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


const logoutAdmin = (req, res) => {
    res.clearCookie("adminToken", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logout successful" });
  };
  
  module.exports = {authLogin, logoutAdmin}