const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  adminMiddleware,
} = require("../middleware/middleware.js");
const upload = require("../middleware/uploadMiddleware");
const userController = require("../controller/userController");
const categoryArtikelController = require("../controller/categoryArtikelController");
const artikelController = require("../controller/artikelController");
const categoryVideoController = require("../controller/categoryVideoController");
const videoTutorialController = require("../controller/videoTutorialController");

// --- USER ROUTES ---
// --- USER ROUTES ---
// Register User
router.post("/register", userController.createNewUser);
// Login User
router.post("/login", userController.loginUser);
// Logout User
router.post("/logout", userController.logoutUser);
// Get All Users (Authenticated)
router.get("/getAllUser", authenticateJWT, userController.getAllUsers);
// Forgot Password (Sends OTP)
router.post("/forgot-password", userController.forgotPassword);
// Reset Password (POST with OTP and new password)
router.post("/reset-password", userController.resetPassword);
// Verify OTP for Password Reset (GET)
router.get("/reset-password/verify/:otp", userController.verifyOTP); 
// Update User
router.put("/update-user/:id", userController.updateUser);


// --- CATEGORY ARTIKEL ROUTES ---
router.get("/categoryArtikel", categoryArtikelController.getAllCategoryArtikel);
router.get("/categoryArtikel/:id", categoryArtikelController.getCategoryArtikelById); // Route to get category by ID
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
router.get("/artikel", artikelController.getAllArtikel);
router.get("/artikel/:id", artikelController.getArtikelById); // New route to get article by ID
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
  upload.fields([{ name: "videoUrl" }, { name: "thumbnailUrl" }]),
  (req, res) => {
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    }
    videoTutorialController.createNewVideoTutorial(req, res);
  }
);

// Uncomment these routes when you implement the corresponding functions
// router.put("/videoTutorial/:id", authenticateJWT, adminMiddleware, videoTutorialController.updateVideoTutorial);
// router.delete("/videoTutorial/:id", authenticateJWT, adminMiddleware, videoTutorialController.deleteVideoTutorial);

module.exports = router;
