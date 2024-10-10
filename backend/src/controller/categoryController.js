const dbpool = require("../config/database");

// Function to ensure the categories table exists
const ensureCategoryTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    await dbpool.execute(createTableQuery);
  } catch (error) {
    console.error("Error creating categories table:", error);
    throw error;
  }
};

// Mendapatkan semua categories
const getAllCategories = async (req, res) => {
  try {
    await ensureCategoryTableExists(); // Ensure table exists
    const SQLQuery = "SELECT * FROM categories";
    const [categories] = await dbpool.execute(SQLQuery);
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve categories",
      ServerMessage: error,
    });
  }
};

// Fungsi untuk membuat category baru
const createNewCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    await ensureCategoryTableExists(); // Ensure table exists

    // Insert new category into the database
    const SQLQuery = `
      INSERT INTO categories (name, description, created_at, updated_at)
      VALUES (?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [name, description]);

    // Get the ID of the newly created category
    const newCategoryId = result.insertId;

    // Retrieve the newly created category from the database
    const getCategoryQuery = "SELECT id, name, description, created_at FROM categories WHERE id = ?";
    const [newCategory] = await dbpool.execute(getCategoryQuery, [newCategoryId]);

    res.json({
      message: "CREATE NEW CATEGORY SUCCESS",
      category: newCategory[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "CREATE NEW CATEGORY FAILED",
      ServerMessage: error,
    });
  }
};

// Fungsi untuk memperbarui category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    await ensureCategoryTableExists(); // Ensure table exists

    // Update the category in the database
    const SQLQuery = `
      UPDATE categories 
      SET name = ?, description = ?, updated_at = NOW()
      WHERE id = ?
    `;
    await dbpool.execute(SQLQuery, [name, description, id]);

    // Retrieve the updated category from the database
    const getCategoryQuery = "SELECT id, name, description, created_at, updated_at FROM categories WHERE id = ?";
    const [updatedCategory] = await dbpool.execute(getCategoryQuery, [id]);

    res.json({
      message: "UPDATE CATEGORY SUCCESS",
      category: updatedCategory[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "UPDATE CATEGORY FAILED",
      ServerMessage: error,
    });
  }
};

// Fungsi untuk menghapus category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await ensureCategoryTableExists(); // Ensure table exists

    // Delete the category from the database
    const SQLQuery = "DELETE FROM categories WHERE id = ?";
    await dbpool.execute(SQLQuery, [id]);

    res.json({
      message: "DELETE CATEGORY SUCCESS",
      deletedCategoryId: id,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE CATEGORY FAILED",
      ServerMessage: error,
    });
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
