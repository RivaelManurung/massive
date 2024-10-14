const dbpool = require("../config/database");

// Function to automatically create the users table if it doesn't exist
const createUsersTable = async () => {
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

// Function to get all users
const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbpool.execute(SQLQuery);
};

// Function to create a new user
const createUser = (name, email, hashedPassword, role) => {
  const SQLQuery = `
    INSERT INTO users (name, email, password, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  return dbpool.execute(SQLQuery, [name, email, hashedPassword, role]);
};

// Function to get a user by name
const getUserByName = (name) => {
  const SQLQuery = "SELECT * FROM users WHERE name = ?";
  return dbpool.execute(SQLQuery, [name]);
};

// Automatically create the users table when the module is loaded
createUsersTable();

module.exports = {
  getAllUsers,
  createUser,
  getUserByName,
};
