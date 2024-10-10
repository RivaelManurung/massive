const dbpool = require("../config/database");

// Function to automatically create the categories table if it doesn't exist
const createCategoriesTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    // Execute the query to create the table
    await dbpool.execute(createTableQuery);
    console.log("Categories table created or already exists.");
  } catch (error) {
    console.error("Failed to create categories table:", error);
  }
};

// Get all categories from the database
const getAllCategories = () => {
  const SQLQuery = "SELECT * FROM categories";
  return dbpool.execute(SQLQuery);
};

// Create a new category with id, created_at, and updated_at
const createNewCategory = (body) => {
  const SQLQuery = `
    INSERT INTO categories (name, description, created_at, updated_at)
    VALUES (?, ?, NOW(), NOW())
  `;

  // Use an array to safely pass user input into the SQL query
  return dbpool.execute(SQLQuery, [body.name, body.description]);
};

// Automatically create the categories table when the module is loaded
createCategoriesTable();

module.exports = {
  getAllCategories,
  createNewCategory,
};
