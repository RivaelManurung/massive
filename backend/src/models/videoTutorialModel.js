const dbpool = require("../config/database");

class VideoTutorial {
  constructor(id, title, description, videoUrl, categoryVideoId, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.videoUrl = videoUrl;
    this.categoryVideolId = categoryVideoId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = VideoTutorial;
