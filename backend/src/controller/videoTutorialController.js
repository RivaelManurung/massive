const dbpool = require("../config/database");
const VideoTutorial = require("../models/videoTutorialModel");

// Membuat tabel jika belum ada
const ensureVideoTutorialTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS videoTutorial (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      videoUrl VARCHAR(255) NOT NULL,
      categoryVideoId INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryVideoId) REFERENCES categoryVideo(id) ON DELETE CASCADE
    );
  `;
  try {
    await dbpool.execute(createTableQuery);
    console.log("VideoTutorial table created or already exists.");
  } catch (error) {
    console.error("Error creating VideoTutorial table:", error);
  }
};
ensureVideoTutorialTableExists();

// Mendapatkan semua video tutorial
const getAllVideoTutorials = async (req, res) => {
  try {
    const SQLQuery = `
      SELECT vt.*, cv.name AS categoryName
      FROM videoTutorial vt
      LEFT JOIN categoryVideo cv ON vt.categoryVideoId = cv.id;
    `;
    const [rows] = await dbpool.execute(SQLQuery);

    const videos = rows.map(
      (row) =>
        new VideoTutorial(
          row.id,
          row.title,
          row.description,
          row.videoUrl,
          row.categoryVideoId,
          row.created_at,
          row.updated_at
        )
    );

    res.json(videos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve video tutorials",
      serverMessage: error.message,
    });
  }
};

// Membuat video tutorial baru
const createNewVideoTutorial = async (req, res) => {
  const { title, description, categoryVideoId } = req.body;
  const videoUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !videoUrl) {
    return res.status(400).json({
      message: "Title, description, and videoUrl are required fields.",
    });
  }

  try {
    const SQLQuery = `
      INSERT INTO videoTutorial (title, description, videoUrl, categoryVideoId, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [
      title,
      description,
      videoUrl,
      categoryVideoId || null,
    ]);

    const newVideo = new VideoTutorial(
      result.insertId,
      title,
      description,
      videoUrl,
      categoryVideoId,
      new Date(),
      new Date()
    );

    res.json({
      message: "CREATE NEW VIDEO TUTORIAL SUCCESS",
      video: newVideo,
    });
  } catch (error) {
    res.status(500).json({
      message: "CREATE NEW VIDEO TUTORIAL FAILED",
      serverMessage: error.message,
    });
  }
};

// Export controller functions
module.exports = {
  getAllVideoTutorials,
  createNewVideoTutorial,
  // updateVideoTutorial,
  // deleteVideoTutorial,
};
