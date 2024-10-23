const express = require("express");
require("dotenv").config();
const dbpool = require("./src/config/database.js");
const userRoutes = require("./src/routes/route.js"); // Import routes
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
const path = require("path"); // Import path module

app.use(cors()); // Allow all domains; adjust CORS configuration as needed

app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use the imported routes
app.use("/", userRoutes); // Ensure the path is as desired

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}!`);
});
