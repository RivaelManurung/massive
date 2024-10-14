const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Controller for getting all users
const getAllUser = async (req, res) => {
  try {
    const [users] = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users",
      ServerMessage: error,
    });
  }
};

// Controller for creating a new user
const createNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role to 'user' if not provided
    const userRole = role || 'user';

    // Create new user in the database
    await userModel.createUser(name, email, hashedPassword, userRole);

    res.json({
      message: "CREATE NEW USER SUCCESS",
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
        message: "CREATE NEW USER FAILED",
        error: "Email already exists. Please use a different email address.",
      });
    } else {
      res.status(500).json({
        message: "CREATE NEW USER FAILED",
        ServerMessage: error,
      });
    }
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Get user by name
    const [user] = await userModel.getUserByName(name);

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user[0].id, name: user[0].name, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      ServerMessage: error,
    });
  }
};

// Controller for user logout
const logoutUser = (req, res) => {
  res.json({ message: "Logout success" });
};

module.exports = {
  getAllUser,
  createNewUser,
  loginUser,
  logoutUser,
};
