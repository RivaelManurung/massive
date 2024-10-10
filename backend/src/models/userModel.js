const dbpool = require("../config/database");

// Function to automatically create the users table if it doesn't exist
const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    // Execute the query to create the table
    await dbpool.execute(createTableQuery);
    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Failed to create users table:", error);
  }
};

// Get all users from the database
const getAllUser = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbpool.execute(SQLQuery);
};

// Create a new user with id, created_at, and updated_at
const createNewUser = (body) => {
  const SQLQuery = `
    INSERT INTO users (name, email, password, created_at, updated_at)
    VALUES (?, ?, ?, NOW(), NOW())
  `;

  // Use an array to safely pass user input into the SQL query
  return dbpool.execute(SQLQuery, [body.name, body.email, body.password]);
};

// Automatically create the users table when the module is loaded
createUsersTable();

module.exports = {
  getAllUser,
  createNewUser,
};
