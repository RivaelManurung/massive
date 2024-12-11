const express = require("express");
const router = express.Router();

// Middleware
const {
  authenticateJWT,
  adminMiddleware,
} = require("../middleware/middleware.js");
const upload = require("../middleware/uploadMiddleware");

// Controllers
const userController = require("../controller/userController");
const categoryArtikelController = require("../controller/categoryArtikelController");
const artikelController = require("../controller/artikelController");
const categoryVideoController = require("../controller/categoryVideoController");
const videoTutorialController = require("../controller/videoTutorialController");
const forumController = require("../controller/forumController");

// --- USER ROUTES ---
router.post("/register", userController.createNewUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/getAllUser", authenticateJWT, userController.getAllUsers);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/reset-password/verify/:otp", userController.verifyOTP);
router.put("/update-user/:id", userController.updateUser);

// --- CATEGORY ARTIKEL ROUTES ---
router.get("/categoryArtikel", categoryArtikelController.getAllCategoryArtikel);
router.get(
  "/categoryArtikel/:id",
  categoryArtikelController.getCategoryArtikelById
);
router.post(
  "/categoryArtikel",
  authenticateJWT,
  adminMiddleware,
  categoryArtikelController.createNewCategoryArtikel
);
router.put(
  "/categoryArtikel/:id",
  authenticateJWT,
  adminMiddleware,
  categoryArtikelController.updateCategoryArtikel
);
router.delete(
  "/categoryArtikel/:id",
  authenticateJWT,
  adminMiddleware,
  categoryArtikelController.deleteCategoryArtikel
);

// --- ARTIKEL ROUTES ---
// Artikel Routes
router.get("/artikel", artikelController.getAllArtikel);
router.get("/artikel/:id", artikelController.getArtikelById);
router.post(
  "/artikel",
  authenticateJWT,
  adminMiddleware,
  upload.single("imageUrl"),
  artikelController.createNewArtikel
);
router.put(
  "/artikel/:id",
  authenticateJWT,
  adminMiddleware,
  upload.single("imageUrl"),
  artikelController.updateArtikel
);
router.delete(
  "/artikel/:id",
  authenticateJWT,
  adminMiddleware,
  artikelController.deleteArtikel
);

// --- CATEGORY VIDEO ROUTES ---
router.get("/categoryVideo", categoryVideoController.getAllCategoryVideo);
router.get("/categoryVideo/:id", categoryVideoController.getCategoryVideoById);
router.post(
  "/categoryVideo",
  authenticateJWT,
  adminMiddleware,
  categoryVideoController.createNewCategoryVideo
);
router.put(
  "/categoryVideo/:id",
  authenticateJWT,
  adminMiddleware,
  categoryVideoController.updateCategoryVideo
);
router.delete(
  "/categoryVideo/:id",
  authenticateJWT,
  adminMiddleware,
  categoryVideoController.deleteCategoryVideo
);

// --- VIDEO TUTORIAL ROUTES ---
router.get("/videoTutorial", videoTutorialController.getAllVideoTutorials);
router.get("/videoTutorial/:id", videoTutorialController.getVideoTutorialById);
router.post(
  "/videoTutorial",
  authenticateJWT,
  adminMiddleware,
  upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "thumbnailUrl", maxCount: 1 },
  ]), // Menyesuaikan upload.fields
  (req, res) => {
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    }
    videoTutorialController.createNewVideoTutorial(req, res);
  }
);
router.put("/videoTutorial/:id", videoTutorialController.updateVideoTutorial);
router.delete("/videoTutorial/:id", videoTutorialController.deleteVideoTutorial)
// Uncomment for future implementation of update/delete routes
// router.put("/videoTutorial/:id", authenticateJWT, adminMiddleware, videoTutorialController.updateVideoTutorial);
// router.delete("/videoTutorial/:id", authenticateJWT, adminMiddleware, videoTutorialController.deleteVideoTutorial);

// --- FORUM ROUTES ---
router.get("/forum", forumController.getAllForums);
router.get("/forum/:id", forumController.getForumById);
router.post(
  "/forum",
  authenticateJWT,
  upload.single("imageUrl"), // Memastikan 'imageUrl' untuk upload gambar forum
  forumController.createNewForum
);
// Uncomment for future implementation of update/delete routes
// router.put("/forum/:id", authenticateJWT, adminMiddleware, forumController.updateForum);
// router.delete("/forum/:id", authenticateJWT, adminMiddleware, forumController.deleteForum);

module.exports = router;
