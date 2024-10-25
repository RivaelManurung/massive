const dbpool = require("../config/database");
const Artikel = require("../models/artikelModel.js");
const path = require("path");

// Membuat tabel artikel jika belum ada
const ensureArtikelTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS artikel (
      id INT AUTO_INCREMENT PRIMARY KEY,
      judul VARCHAR(255) NOT NULL,
      deskripsi TEXT NOT NULL,
      imageUrl VARCHAR(255),
      categoryArtikelId INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryArtikelId) REFERENCES categoryArtikel(id) ON DELETE CASCADE
    );
  `;
  try {
    await dbpool.execute(createTableQuery);
    console.log("Artikel table created or already exists.");
  } catch (error) {
    console.error("Error creating Artikel table:", error);
  }
};

ensureArtikelTableExists();

// Mendapatkan semua artikel
const getAllArtikel = async (req, res) => {
  try {
    await ensureArtikelTableExists();
    const SQLQuery = "SELECT * FROM artikel";
    const [rows] = await dbpool.execute(SQLQuery);

    const artikels = rows.map(
      (row) => new Artikel(
        row.id, row.judul, row.deskripsi, row.imageUrl, 
        row.categoryArtikelId, row.created_at, row.updated_at
      )
    );

    res.json(artikels);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve artikels",
      ServerMessage: error,
    });
  }
};

// Membuat artikel baru dengan upload image
const createNewArtikel = async (req, res) => {
  const { judul, deskripsi, categoryArtikelId = null } = req.body;
  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

  // Validasi input
  if (!judul || !deskripsi) {
    return res.status(400).json({ 
      message: "CREATE NEW ARTIKEL FAILED", 
      error: "Field 'judul' and 'deskripsi' are required." 
    });
  }

  try {
    await ensureArtikelTableExists();
    const SQLQuery = `
      INSERT INTO artikel (judul, deskripsi, imageUrl, categoryArtikelId, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [
      judul, deskripsi, imageUrl, categoryArtikelId,
    ]);

    const newArtikel = new Artikel(
      result.insertId, judul, deskripsi, imageUrl, categoryArtikelId, new Date(), new Date()
    );

    res.json({
      message: "CREATE NEW ARTIKEL SUCCESS",
      artikel: newArtikel,
    });
  } catch (error) {
    res.status(500).json({
      message: "CREATE NEW ARTIKEL FAILED",
      ServerMessage: error.message,
    });
  }
};

// Memperbarui artikel
const updateArtikel = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, categoryArtikelId } = req.body;
  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null; // Mendapatkan URL gambar baru

  try {
    await ensureArtikelTableExists();

    const SQLQuery = `
      UPDATE artikel
      SET judul = ?, deskripsi = ?, imageUrl = ?, categoryArtikelId = ?, updated_at = NOW()
      WHERE id = ?
    `;
    await dbpool.execute(SQLQuery, [judul, deskripsi, imageUrl, categoryArtikelId, id]);

    const updatedArtikel = new Artikel(id, judul, deskripsi, imageUrl, categoryArtikelId, null, new Date());
    res.json({
      message: "UPDATE ARTIKEL SUCCESS",
      artikel: updatedArtikel,
    });
  } catch (error) {
    res.status(500).json({
      message: "UPDATE ARTIKEL FAILED",
      ServerMessage: error,
    });
  }
};

// Menghapus artikel
const deleteArtikel = async (req, res) => {
  const { id } = req.params;
  try {
    await ensureArtikelTableExists();

    const SQLQuery = "DELETE FROM artikel WHERE id = ?";
    await dbpool.execute(SQLQuery, [id]);

    res.json({
      message: "DELETE ARTIKEL SUCCESS",
      deletedArtikelId: id,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE ARTIKEL FAILED",
      ServerMessage: error,
    });
  }
};

// Ekspor controller
module.exports = {
  getAllArtikel,
  createNewArtikel,
  updateArtikel,
  deleteArtikel,
  ensureArtikelTableExists,
};
