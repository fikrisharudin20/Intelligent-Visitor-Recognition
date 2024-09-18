const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const defaultDomain = "camera.html"

const hostname = "localhost";
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "photo-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST route to handle file uploads
app.post("/upload", upload.single("photo"), (req, res) => {
  console.log("Image uploaded successfully!");
  res.send("Image uploaded successfully!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/${defaultDomain}`);
});