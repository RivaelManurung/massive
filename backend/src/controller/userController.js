const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbpool = require("../config/database");

// Mendapatkan semua user
// Mendapatkan semua user
const getAllUser = async (req, res) => {
  try {
    const SQLQuery = "SELECT * FROM users";
    const [users] = await dbpool.execute(SQLQuery);
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users",
      ServerMessage: error,
    });
  }
};

// Fungsi untuk registrasi user
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const SQLQuery = `
      INSERT INTO users (name, email, password, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [name, email, hashedPassword]);

    // Get the ID of the newly created user
    const newUserId = result.insertId;

    // Retrieve the newly created user from the database
    const getUserQuery = "SELECT id, name, email, created_at FROM users WHERE id = ?";
    const [newUser] = await dbpool.execute(getUserQuery, [newUserId]);

    res.json({
      message: "CREATE NEW USER SUCCESS",
      user: newUser[0],
    });
  } catch (error) {
    // Check if the error is due to a duplicate email
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



// Fungsi untuk login user
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Cari user di database
    const SQLQuery = "SELECT * FROM users WHERE name = ?";
    const [user] = await dbpool.execute(SQLQuery, [name]);

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user[0].id, name: user[0].name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // token berlaku selama 1 jam
      }
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

// Fungsi untuk logout user (di client-side, biasanya token dihapus)
const logoutUser = (req, res) => {
  // Biasanya logout hanya menghapus token di sisi client
  res.json({ message: "Logout success" });
};

module.exports = {
  getAllUser,
  createNewUser,
  loginUser,
  logoutUser,
};
