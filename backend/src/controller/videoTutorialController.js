const dbpool = require("../config/database");
const VideoTutorial = require("../models/videoTutorialModel");

// Pastikan tabel videoTutorial ada dengan kolom thumbnailUrl tidak boleh NULL
const ensureVideoTutorialTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS videoTutorial (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      videoUrl VARCHAR(255) NOT NULL,
      thumbnailUrl VARCHAR(255) NOT NULL,  -- Tidak boleh NULL
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

    const videos = rows.map(
      (row) =>
        new VideoTutorial(
          row.id,
          row.title,
          row.description,
          row.videoUrl,
          row.categoryVideoId,
          row.thumbnailUrl,
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
      return res.status(404).json({ message: "Video tutorial not found." });
    }

    const video = new VideoTutorial(
      rows[0].id,
      rows[0].title,
      rows[0].description,
      rows[0].videoUrl,
      rows[0].categoryVideoId,
      rows[0].thumbnailUrl,
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
  console.log("Uploaded Files:", req.files); // Log untuk debugging

  const { title, description, categoryVideoId } = req.body;

  const videoUrl = req.files.videoUrl
    ? `/uploads/videos/${req.files.videoUrl[0].filename}`
    : null;
  const thumbnailUrl = req.files.thumbnailUrl
    ? `/uploads/thumbnails/${req.files.thumbnailUrl[0].filename}`
    : null;

  if (!title || !description || !videoUrl || !thumbnailUrl) {
    return res.status(400).json({
      message: "Title, description, videoUrl, and thumbnailUrl are required fields.",
    });
  }

  try {
    const SQLQuery = `
      INSERT INTO videoTutorial (title, description, videoUrl, thumbnailUrl, categoryVideoId, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [
      title,
      description,
      videoUrl,
      thumbnailUrl,
      categoryVideoId || null,
    ]);

    const newVideo = new VideoTutorial(
      result.insertId,
      title,
      description,
      videoUrl,
      categoryVideoId,
      thumbnailUrl,
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
  
// Update video tutorial
const updateVideoTutorial = async (req, res) => {
  const { id } = req.params;
  const { title, description, categoryVideoId } = req.body;

  try {
    // First, fetch the existing video tutorial
    const [existingRows] = await dbpool.execute(
      'SELECT title, description, videoUrl, thumbnailUrl, categoryVideoId FROM videoTutorial WHERE id = ?', 
      [id]
    );

    if (existingRows.length === 0) {
      throw new Error("Video tutorial not found");
    }

    // Prepare update values, using existing values if not provided
    const updateTitle = title || existingRows[0].title;
    const updateDescription = description || existingRows[0].description;
    const updateCategoryVideoId = categoryVideoId || existingRows[0].categoryVideoId;

    // Handle file updates
    let updateVideoUrl = existingRows[0].videoUrl;
    let updateThumbnailUrl = existingRows[0].thumbnailUrl;

    // Update video file if provided
    if (req.files && req.files.videoUrl) {
      updateVideoUrl = `/uploads/videos/${req.files.videoUrl[0].filename}`;
    }

    // Update thumbnail if provided
    if (req.files && req.files.thumbnailUrl) {
      updateThumbnailUrl = `/uploads/thumbnails/${req.files.thumbnailUrl[0].filename}`;
    }

    // Validate that we have all required fields
    if (!updateTitle || !updateDescription || !updateVideoUrl || !updateThumbnailUrl) {
      throw new Error("Title, description, videoUrl, and thumbnailUrl are required fields");
    }

    // Create update fields
    const updatedFields = {
      title: updateTitle,
      description: updateDescription,
      videoUrl: updateVideoUrl,
      thumbnailUrl: updateThumbnailUrl,
      categoryVideoId: updateCategoryVideoId,
    };

    // Create set clause
    const setClause = Object.keys(updatedFields).map((key) => `${key} = ?`).join(", ");

    // Create values array
    const values = [...Object.values(updatedFields), id];

    // Perform the update
    const SQLQuery = `UPDATE videoTutorial SET ${setClause}, updated_at = NOW() WHERE id = ?`;
    const [result] = await dbpool.execute(SQLQuery, values);

    if (result.affectedRows === 0) {
      throw new Error("Tidak ada perubahan pada data");
    }

    res.json({
      message: "Video tutorial updated successfully.",
      updatedFields: updatedFields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal update video tutorial",
      serverMessage: error.message,
    });
  }
};
// Delete video tutorial
const deleteVideoTutorial = async (req, res) => {
  const { id } = req.params;

  try {
    const SQLQuery = "DELETE FROM videoTutorial WHERE id = ?";
    const [result] = await dbpool.execute(SQLQuery, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Video tutorial not found." });
    }

    res.json({
      message: "Video tutorial deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete video tutorial",
      serverMessage: error.message,
    });
  }
};



// Export controller functions
module.exports = {
  getAllVideoTutorials,
  getVideoTutorialById,
  createNewVideoTutorial,
  updateVideoTutorial,
  deleteVideoTutorial,
};
