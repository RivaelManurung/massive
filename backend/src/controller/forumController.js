const dbpool = require("../config/database");
const Forum = require("../models/forumModel.js");
const Reply = require("../models/replyModel.js");

// --- Ensure Database Tables Exist ---
const ensureTablesExist = async () => {
  const createForumTableQuery = `
    CREATE TABLE IF NOT EXISTS forum (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      userId INT NOT NULL,
      keywords JSON,
      imageUrl VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
  const createRepliesTableQuery = `
    CREATE TABLE IF NOT EXISTS replies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      forumId INT NOT NULL,
      userId INT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (forumId) REFERENCES forum(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
  try {
    await dbpool.execute(createForumTableQuery);
    await dbpool.execute(createRepliesTableQuery);
    console.log("Forum and Replies tables are ready.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

ensureTablesExist();

// --- Get All Forums ---
const getAllForums = async (req, res) => {
    try {
      const SQLQuery = "SELECT * FROM forum";
      const [rows] = await dbpool.execute(SQLQuery);
  
      const forums = rows.map((row) => {
        let keywords = [];
        try {
          keywords = row.keywords ? JSON.parse(row.keywords) : [];
        } catch (error) {
          console.error(`Error parsing keywords for forum ID ${row.id}:`, error);
          keywords = [];  // Default to an empty array if JSON parsing fails
        }
      
        return {
          id: row.id,
          title: row.title,
          content: row.content,
          userId: row.userId,
          keywords,
          imageUrl: row.imageUrl,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        };
      });
      
  
      res.json(forums);
    } catch (error) {
      console.error('Error retrieving forums:', error);
      res.status(500).json({
        message: "Failed to retrieve forums",
        serverMessage: error.message,
      });
    }
  };
  

  const getForumById = async (req, res) => {
    const { id } = req.params;
    try {
      const forumQuery = "SELECT * FROM forum WHERE id = ?";
      const repliesQuery = "SELECT * FROM replies WHERE forumId = ?";
  
      const [forumRows] = await dbpool.execute(forumQuery, [id]);
      const [replyRows] = await dbpool.execute(repliesQuery, [id]);1
  
      if (forumRows.length === 0) {
        return res.status(404).json({ message: "Forum not found" });
      }
  
      const forum = {
        id: forumRows[0].id,
        title: forumRows[0].title,
        content: forumRows[0].content,
        userId: forumRows[0].userId,
        keywords: JSON.parse(forumRows[0].keywords || "[]"),
        imageUrl: forumRows[0].imageUrl,
        createdAt: forumRows[0].created_at,
        updatedAt: forumRows[0].updated_at,
        replies: replyRows.map((reply) => ({
          id: reply.id,
          forumId: reply.forumId,
          userId: reply.userId,
          content: reply.content,
          createdAt: reply.created_at,
          updatedAt: reply.updated_at,
        })),
      };
  
      res.json(forum);
    } catch (error) {
        console.error("Error fetching forum:", error); // Log error details
        res.status(500).json({
          message: "Failed to retrieve forum",
          serverMessage: error.message, // Provide more detailed error message
        });
      }
  };
  

// --- Create a New Forum ---
const createNewForum = async (req, res) => {
    const { title, content, keywords } = req.body;
    const userId = req.user.id;  // Ensure `req.user` is being set properly via authentication
    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
  
    if (!title || !content || !userId) {
      return res.status(400).json({
        message: "Fields 'title', 'content', and 'userId' are required.",
      });
    }
  
    if (title.length > 255 || content.length > 10000) {
      return res.status(400).json({
        message: "Title or content exceeds the maximum allowed length.",
      });
    }
  
    if (keywords && keywords.length > 3) {
      return res.status(400).json({
        message: "Keywords should not exceed 3.",
      });
    }
  
    try {
      const SQLQuery = `
        INSERT INTO forum (title, content, userId, keywords, imageUrl, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `;
      const [result] = await dbpool.execute(SQLQuery, [
        title,
        content,
        userId,
        JSON.stringify(keywords || []),
        imageUrl,
      ]);
  
      const newForum = new Forum(
        result.insertId,
        title,
        content,
        userId,
        keywords || [],
        imageUrl,
        new Date(),
        new Date()
      );
  
      res.json({
        message: "Forum created successfully.",
        forum: newForum,
      });
    } catch (error) {
      console.error("Error creating forum:", error);
      res.status(500).json({
        message: "Failed to create forum.",
        serverMessage: error.message,
      });
    }
  };
  
  

// --- Add Reply to Forum ---
const addReplyToForum = async (req, res) => {
  const { forumId } = req.params;
  const { userId, content } = req.body;

  if (!content || !userId) {
    return res.status(400).json({
      message: "Fields 'content' and 'userId' are required.",
    });
  }

  try {
    const SQLQuery = `
      INSERT INTO replies (forumId, userId, content, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbpool.execute(SQLQuery, [forumId, userId, content]);

    const newReply = new Reply(
      result.insertId,
      forumId,
      userId,
      content,
      new Date(),
      new Date()
    );

    res.json({
      message: "Reply added successfully.",
      reply: newReply,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add reply.",
      serverMessage: error.message,
    });
  }
};

// --- Export Controllers ---
module.exports = {
  getAllForums,
  getForumById,
  createNewForum,
  addReplyToForum,
};
