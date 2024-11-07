const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbpool = require("../config/database");
const User = require("../models/userModel");

// Membuat tabel users jika belum ada
const ensureUsersTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  try {
    await dbpool.execute(createTableQuery);
    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};
ensureUsersTableExists();
// Mendapatkan semua user
const getAllUsers = async (req, res) => {
  try {
    await ensureUsersTableExists();
    const [rows] = await dbpool.execute("SELECT * FROM users");

    // Ubah setiap row menjadi instance dari class User
    const users = rows.map(
      (row) =>
        new User(
          row.id,
          row.name,
          row.email,
          row.password,
          row.role,
          row.created_at,
          row.updated_at
        )
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users",
      ServerMessage: error,
    });
  }
};

// Membuat user baru
const createNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    await ensureUsersTableExists();

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "user";

    const SQLQuery = `
      INSERT INTO users (name, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [
      name,
      email,
      hashedPassword,
      userRole,
    ]);

    const newUser = new User(
      result.insertId,
      name,
      email,
      hashedPassword,
      userRole,
      new Date(),
      new Date()
    );
    res.json({
      message: "CREATE NEW USER SUCCESS",
      user: newUser,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        message: "CREATE NEW USER FAILED",
        error: "Email already exists. Please use a different email.",
      });
    } else {
      res.status(500).json({
        message: "CREATE NEW USER FAILED",
        ServerMessage: error,
      });
    }
  }
};

// Login user
// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await ensureUsersTableExists();
    const [rows] = await dbpool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login success", token });
  } catch (error) {
    console.error("Error during login:", error); // Log error untuk debugging
    res.status(500).json({
      message: "Login failed",
      ServerMessage: error.message || error,
    });
  }
};



// Logout user
const logoutUser = (req, res) => {
  res.json({ message: "Logout success" });
};

module.exports = {
  getAllUsers,
  createNewUser,
  loginUser,
  logoutUser,
  ensureUsersTableExists,
};
