const dbpool = require("../config/database");
const CategoryArtikel = require("../models/categoryArtikelModel.js");

// Membuat tabel categoryArtikel jika belum ada
const ensureCategoryArtikelTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS categoryArtikel (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  try {
    await dbpool.execute(createTableQuery);
    console.log("CategoryArtikel table created or already exists.");
  } catch (error) {
    console.error("Error creating CategoryArtikel table:", error);
  }
};
ensureCategoryArtikelTableExists();

// Mendapatkan semua kategori artikel
const getAllCategoryArtikel = async (req, res) => {
  try {
    await ensureCategoryArtikelTableExists();
    const SQLQuery = "SELECT * FROM categoryArtikel";
    const [rows] = await dbpool.execute(SQLQuery);

    const categoryArtikels = rows.map(
      (row) => new CategoryArtikel(row.id, row.name, row.description, row.created_at, row.updated_at)
    );

    res.json(categoryArtikels);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve category artikels",
      ServerMessage: error,
    });
  }
};

// Membuat kategori artikel baru
const createNewCategoryArtikel = async (req, res) => {
  const { name, description } = req.body;
  try {
    await ensureCategoryArtikelTableExists();

    const SQLQuery = `
      INSERT INTO categoryArtikel (name, description, created_at, updated_at)
      VALUES (?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [name, description]);

    const newCategoryArtikel = new CategoryArtikel(result.insertId, name, description, new Date(), new Date());
    res.json({
      message: "CREATE NEW CATEGORY ARTIKEL SUCCESS",
      categoryArtikel: newCategoryArtikel,
    });
  } catch (error) {
    res.status(500).json({
      message: "CREATE NEW CATEGORY ARTIKEL FAILED",
      ServerMessage: error,
    });
  }
};

// Memperbarui kategori artikel
const updateCategoryArtikel = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await ensureCategoryArtikelTableExists();

    const SQLQuery = `
      UPDATE categoryArtikel
      SET name = ?, description = ?, updated_at = NOW()
      WHERE id = ?
    `;
    await dbpool.execute(SQLQuery, [name, description, id]);

    const updatedCategoryArtikel = new CategoryArtikel(id, name, description, null, new Date());
    res.json({
      message: "UPDATE CATEGORY ARTIKEL SUCCESS",
      categoryArtikel: updatedCategoryArtikel,
    });
  } catch (error) {
    res.status(500).json({
      message: "UPDATE CATEGORY ARTIKEL FAILED",
      ServerMessage: error,
    });
  }
};

// Menghapus kategori artikel
const deleteCategoryArtikel = async (req, res) => {
  const { id } = req.params;
  try {
    await ensureCategoryArtikelTableExists();

    const SQLQuery = "DELETE FROM categoryArtikel WHERE id = ?";
    await dbpool.execute(SQLQuery, [id]);

    res.json({
      message: "DELETE CATEGORY ARTIKEL SUCCESS",
      deletedCategoryArtikelId: id,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE CATEGORY ARTIKEL FAILED",
      ServerMessage: error,
    });
  }
};

module.exports = {
  getAllCategoryArtikel,
  createNewCategoryArtikel,
  updateCategoryArtikel,
  deleteCategoryArtikel,
  ensureCategoryArtikelTableExists
};
