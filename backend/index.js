const express = require("express");
require("dotenv").config();
const dbpool = require("./src/config/database.js");
const userRoutes = require("./src/routes/route.js"); // Import routes
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
app.use(cors()); // Mengizinkan semua domain; sesuaikan konfigurasi CORS sesuai kebutuhan

app.use(express.json());

// Gunakan rute yang telah diimpor
app.use("/", userRoutes); // Pastikan path sesuai dengan yang diinginkan

// Jalankan server
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}!`);
});
