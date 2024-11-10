const dbpool = require("../config/database");
const Artikel = require("../models/artikelModel.js");
const path = require("path");

// Create the artikel table if it doesn't already exist
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

// Get all articles

const getAllArtikel = async (req, res) => {
  try {
    await ensureArtikelTableExists();
    const SQLQuery = "SELECT * FROM artikel";
    const [rows] = await dbpool.execute(SQLQuery);

    const artikels = rows.map((row) => ({
      id: row.id,
      title: row.judul,  // Send as 'title' for consistency
      description: row.deskripsi,
      imageUrl: row.imageUrl,
      categoryArtikelId: row.categoryArtikelId,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json(artikels);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve articles",
      ServerMessage: error,
    });
  }
};

// Get article by ID
const getArtikelById = async (req, res) => {
  const { id } = req.params;
  try {
    await ensureArtikelTableExists();
    const SQLQuery = "SELECT * FROM artikel WHERE id = ?";
    const [rows] = await dbpool.execute(SQLQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    const artikel = {
      id: rows[0].id,
      title: rows[0].judul,  // Send as 'title' for consistency
      description: rows[0].deskripsi,
      imageUrl: rows[0].imageUrl,
      categoryArtikelId: rows[0].categoryArtikelId,
      createdAt: rows[0].created_at,
      updatedAt: rows[0].updated_at,
    };

    res.json(artikel);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve article",
      ServerMessage: error,
    });
  }
};


// Create a new article with image upload
const createNewArtikel = async (req, res) => {
  const { judul, deskripsi, categoryArtikelId = null } = req.body;
  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

  // Validate input
  if (!judul || !deskripsi) {
    return res.status(400).json({
      message: "CREATE NEW ARTIKEL FAILED",
      error: "Field 'judul' and 'deskripsi' are required.",
    });
  }

  try {
    await ensureArtikelTableExists();
    const SQLQuery = `
      INSERT INTO artikel (judul, deskripsi, imageUrl, categoryArtikelId, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [
      judul,
      deskripsi,
      imageUrl,
      categoryArtikelId,
    ]);

    const newArtikel = new Artikel(
      result.insertId,
      judul,
      deskripsi,
      imageUrl,
      categoryArtikelId,
      new Date(),
      new Date()
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

// Update article by ID
// Update article by ID
const updateArtikel = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, categoryArtikelId } = req.body;
  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

  // Prepare the values to update
  const updatedFields = {};
  if (judul !== undefined) updatedFields.judul = judul;
  if (deskripsi !== undefined) updatedFields.deskripsi = deskripsi;
  if (categoryArtikelId !== undefined) updatedFields.categoryArtikelId = categoryArtikelId;
  if (imageUrl !== null) updatedFields.imageUrl = imageUrl;

  // If no fields were provided to update, return an error
  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({
      message: "UPDATE ARTIKEL FAILED",
      error: "At least one field must be provided to update.",
    });
  }

  // Build the SET part of the SQL query dynamically
  const setClause = Object.keys(updatedFields)
    .map((key) => `${key} = ?`)
    .join(", ");

  // Values for the SQL query (in the same order as the keys in updatedFields)
  const values = Object.values(updatedFields);
  values.push(id); // Add the article ID for the WHERE clause

  try {
    await ensureArtikelTableExists();

    // Dynamic SQL query for updating the article
    const SQLQuery = `
      UPDATE artikel
      SET ${setClause}, updated_at = NOW()
      WHERE id = ?
    `;
    
    // Execute the query with the dynamic values
    await dbpool.execute(SQLQuery, values);

    // Return success response
    res.json({
      message: "UPDATE ARTIKEL SUCCESS",
      artikel: {
        id,
        ...updatedFields,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "UPDATE ARTIKEL FAILED",
      ServerMessage: error,
    });
  }
};




// Delete article by ID
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

// Export controller
module.exports = {
  getAllArtikel,
  getArtikelById, // Export the new function
  createNewArtikel,
  updateArtikel,
  deleteArtikel,
  ensureArtikelTableExists,
};
