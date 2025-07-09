const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require('./routes/router')
 const seed = require('./seed.js')
const cookieParser = require("cookie-parser");


dotenv.config();

connectDB(); // Connect to MongoDB

seed()
app.use(express.json());
app.use(cookieParser()); // <--- Add this line


app.use(cors({
  origin: "http://localhost:3000", // ✅ specific origin, not '*'
  credentials: true               // ✅ allow credentials (cookies)
}));
app.use(express.static("public")); // Serve uploaded images
// const path = require("path");
// app.use("/uploads/images", express.static(path.join(__dirname, "public/uploads/images")));



// app.get('/', (req, res) => {
//   res.send('Backend is running!');
// });

app.use(router)  // Routes


const PORT = process.env.PORT || 5001;
// app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));
 app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));


