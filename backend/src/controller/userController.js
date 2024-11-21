const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dbpool = require("../config/database");
const User = require("../models/userModel");
const sendResetPasswordEmail = require("../middleware/sendResetPasswordEmail"); // Adjust the path

// Ensure users table exists
const ensureUsersTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      phone VARCHAR(15) NOT NULL UNIQUE,
      avatar VARCHAR(255),
      reset_otp VARCHAR(6),
      otp_expires DATETIME,
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

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await dbpool.execute("SELECT * FROM users");
    const users = rows.map(
      (row) =>
        new User(
          row.id,
          row.name,
          row.email,
          row.password,
          row.role,
          row.phone,
          row.avatar,
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

// Create a new user
const createNewUser = async (req, res) => {
  const { name, email, password, phone, avatar, role } = req.body;

  // Validate input
  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "CREATE NEW USER FAILED",
      error: "All fields (name, email, password, phone) are required.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "user";

    const SQLQuery = `
      INSERT INTO users (name, email, password, phone, avatar, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await dbpool.execute(SQLQuery, [
      name,
      email,
      hashedPassword,
      phone,
      avatar || null,
      userRole,
    ]);

    const newUser = new User(
      result.insertId,
      name,
      email,
      hashedPassword,
      userRole,
      phone,
      avatar || null,
      new Date(),
      new Date()
    );

    res.status(201).json({
      message: "CREATE NEW USER SUCCESS",
      user: newUser,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      const conflictField = error.sqlMessage.includes("email")
        ? "email"
        : "phone";
      res.status(409).json({
        message: "CREATE NEW USER FAILED",
        error: `${conflictField} already exists. Please use a different ${conflictField}.`,
      });
    } else {
      res.status(500).json({
        message: "CREATE NEW USER FAILED",
        ServerMessage: error.message || error,
      });
    }
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: "LOGIN FAILED",
      error: "Both email and password are required.",
    });
  }

  try {
    const [rows] = await dbpool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "LOGIN FAILED",
        error: "User not found. Please check your email or register first.",
      });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "LOGIN FAILED",
        error: "Invalid password. Please try again.",
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "LOGIN SUCCESS",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "LOGIN FAILED",
      ServerMessage: error.message || error,
    });
  }
};

// Logout user
const logoutUser = (req, res) => {
  res.json({ message: "Logout success" });
};

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await dbpool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const user = rows[0];

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 600000); // OTP valid for 10 minutes

    // Store OTP and expiry time in the database
    await dbpool.execute(
      "UPDATE users SET reset_otp = ?, otp_expires = ? WHERE id = ?",
      [otp, otpExpires, user.id]
    );

    // Send OTP via email
    await sendResetPasswordEmail(user.email, otp);

    res.json({ message: "OTP sent to email. It will expire in 10 minutes." });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP email", error });
  }
};

// Reset Password - Verify OTP
const resetPassword = async (req, res) => {
  const { otp } = req.body;
  const { newPassword } = req.body;

  try {
    // Validate OTP
    const [rows] = await dbpool.execute(
      "SELECT * FROM users WHERE reset_otp = ? AND otp_expires > NOW()",
      [otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = rows[0];

    // Hash new password and update in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await dbpool.execute(
      "UPDATE users SET password = ?, reset_otp = NULL, otp_expires = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};
const verifyOTP = async (req, res) => {
  const { otp } = req.params;

  try {
    const [rows] = await dbpool.execute(
      "SELECT * FROM users WHERE reset_otp = ? AND otp_expires > NOW()",
      [otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP is valid" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

// Get reset password page (GET) [Optional, not needed in OTP flow]
const getResetPasswordPage = async (req, res) => {
  // OTP-based flow doesn't require this step
  res.json({ message: "No need for page rendering in OTP flow" });
};

module.exports = {
  getAllUsers,
  createNewUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getResetPasswordPage,
  verifyOTP,
};
