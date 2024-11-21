const express = require("express");
require("dotenv").config();
const dbpool = require("./src/config/database.js");
const userRoutes = require("./src/routes/route.js");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static file handling
app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/uploads/videos", express.static(path.join(__dirname, "uploads/videos")));
app.use("/uploads/thumbnails", express.static(path.join(__dirname, "uploads/thumbnails")));

// Routes
app.use("/", userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
