const express = require("express");
require("dotenv").config();
const dbpool = require("./src/config/database.js");
const userRoutes = require("./src/routes/route.js"); // Import routes
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000; // Default ke port 3000 jika PORT tidak diset
const app = express();

// Middleware CORS untuk mengizinkan semua domain (atur sesuai kebutuhan)
app.use(cors());

// Middleware untuk parsing request body JSON
app.use(express.json());

// Middleware untuk serve static files dari folder uploads
app.use(
  "/uploads/thumbnails",
  express.static(path.join(__dirname, "uploads/thumbnails"))
);
app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads/videos"))
);
app.use(
  "/uploads/images", // Static folder untuk gambar artikel
  express.static(path.join(__dirname, "uploads/images"))
);

// Gunakan routes yang sudah diimport
app.use("/", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
