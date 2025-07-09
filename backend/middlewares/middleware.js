const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    cb(null, uploadPath);
  },
  // filename: (req, file, cb) => {
  //   cb(null, Date.now() + path.extname(file.originalname));
  // },
  // filename: function (req, file, cb) {
  //   const ext = path.extname(file.originalname);
  //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   cb(null, uniqueSuffix + ext);
  // },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // ← Store the original file name
  },
});

const upload = multer({ storage });

module.exports = {upload}