const dbpool = require("../config/database");
const CategoryVideo = require("../models/categoryVideoModel.js");

// Membuat tabel categoryVideo jika belum ada
const ensureCategoryVideoTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS categoryVideo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  try {
    await dbpool.execute(createTableQuery);
    console.log("CategoryVideo table created or already exists.");
  } catch (error) {
    console.error("Error creating CategoryVideo table:", error);
  }
};

ensureCategoryVideoTableExists();

// Mendapatkan semua kategori video
const getAllCategoryVideo = async (req, res) => {
  try {
    await ensureCategoryVideoTableExists();
    const SQLQuery = "SELECT * FROM categoryVideo";
    const [rows] = await dbpool.execute(SQLQuery);

    const categoryVideos = rows.map(
      (row) => new CategoryVideo(row.id, row.name, row.created_at, row.updated_at)
    );

    res.json(categoryVideos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve category videos",
      serverMessage: error.message,
    });
  }
};

// Membuat kategori video baru
const createNewCategoryVideo = async (req, res) => {
  const { name } = req.body;
  try {
    await ensureCategoryVideoTableExists();

    const SQLQuery = `
      INSERT INTO categoryVideo (name, created_at, updated_at)
      VALUES (?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [name]);

    const newCategoryVideo = new CategoryVideo(result.insertId, name, new Date(), new Date());
    res.json({
      message: "CREATE NEW CATEGORY VIDEO SUCCESS",
      categoryVideo: newCategoryVideo,
    });
  } catch (error) {
    res.status(500).json({
      message: "CREATE NEW CATEGORY VIDEO FAILED",
      serverMessage: error.message,
    });
  }
};

// Memperbarui kategori video
const updateCategoryVideo = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await ensureCategoryVideoTableExists();

    const SQLQuery = `
      UPDATE categoryVideo
      SET name = ? , updated_at = NOW()
      WHERE id = ?
    `;
    await dbpool.execute(SQLQuery, [name, id]);

    const updatedCategoryVideo = new CategoryVideo(id, name, null, new Date());
    res.json({
      message: "UPDATE CATEGORY VIDEO SUCCESS",
      categoryVideo: updatedCategoryVideo,
    });
  } catch (error) {
    res.status(500).json({
      message: "UPDATE CATEGORY VIDEO FAILED",
      serverMessage: error.message,
    });
  }
};

// Menghapus kategori video
const deleteCategoryVideo = async (req, res) => {
  const { id } = req.params;
  try {
    await ensureCategoryVideoTableExists();

    const SQLQuery = "DELETE FROM categoryVideo WHERE id = ?";
    await dbpool.execute(SQLQuery, [id]);

    res.json({
      message: "DELETE CATEGORY VIDEO SUCCESS",
      deletedCategoryVideoId: id,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE CATEGORY VIDEO FAILED",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllCategoryVideo,
  createNewCategoryVideo,
  updateCategoryVideo,
  deleteCategoryVideo,
  ensureCategoryVideoTableExists,
};
