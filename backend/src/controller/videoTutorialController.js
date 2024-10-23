const dbpool = require("../config/database");
const VideoTutorial = require("../models/videoTutorialModel");

// Ensure the videoTutorial table exists
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

// Get all video tutorials
const getAllVideoTutorials = async (req, res) => {
  try {
    const SQLQuery = `
      SELECT vt.*, cv.name AS categoryName
      FROM videoTutorial vt
      LEFT JOIN categoryVideo cv ON vt.categoryVideoId = cv.id;
    `;
    const [rows] = await dbpool.execute(SQLQuery);

    if (rows.length === 0) {
      return res.json([]); // Return an empty array if no videos found
    }

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

// Get video tutorial by ID
const getVideoTutorialById = async (req, res) => {
  const { id } = req.params;

  try {
    const SQLQuery = `
      SELECT vt.*, cv.name AS categoryName
      FROM videoTutorial vt
      LEFT JOIN categoryVideo cv ON vt.categoryVideoId = cv.id
      WHERE vt.id = ?;
    `;
    const [rows] = await dbpool.execute(SQLQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Video tutorial not found.",
      });
    }

    const video = new VideoTutorial(
      rows[0].id,
      rows[0].title,
      rows[0].description,
      rows[0].videoUrl,
      rows[0].categoryVideoId,
      rows[0].created_at,
      rows[0].updated_at
    );

    res.json(video);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve video tutorial",
      serverMessage: error.message,
    });
  }
};

// Create a new video tutorial
const createNewVideoTutorial = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);
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
  getVideoTutorialById, // Export the new function
  createNewVideoTutorial,
};
