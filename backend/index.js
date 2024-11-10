const express = require("express");
require("dotenv").config();
const dbpool = require("./src/config/database.js");
const userRoutes = require("./src/routes/route.js"); // Import routes
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT not set
const app = express();

// Middleware CORS for allowing all domains (adjust as needed)
app.use(cors());

// Middleware for parsing request body JSON
app.use(express.json());

// Serve static files for images from the correct location (outside src folder)
app.use(
  "/uploads/images",  // Access path for images
  express.static(path.join(__dirname, "uploads/images"))  // Path to the uploads/images folder outside src
);

// Serve other static files like videos and thumbnails if needed
app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads/videos"))
);
app.use(
  "/uploads/thumbnails",
  express.static(path.join(__dirname, "uploads/thumbnails"))
);

// Use the routes defined in userRoutes
app.use("/", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
