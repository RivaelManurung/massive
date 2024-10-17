const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  adminMiddleware,
} = require("../middleware/middleware.js");
const userController = require("../controller/userController");
const categoryArtikelController = require("../controller/categoryArtikelController");
const artikelController = require("../controller/artikelController");
const categoryVideoController = require("../controller/categoryVideoController");
const videoTutorialController = require("../controller/videoTutorialController");

// --- USER ROUTES ---
router.post("/register", userController.createNewUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/getAllUser", authenticateJWT, userController.getAllUsers);

// --- CATEGORY ARTIKEL ROUTES ---
router.get("/categoryArtikel", categoryArtikelController.getAllCategoryArtikel);
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
router.post(
  "/artikel",
  authenticateJWT,
  adminMiddleware,
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
router.post(
  "/videoTutorial",
  authenticateJWT,
  adminMiddleware,
  videoTutorialController.createNewVideoTutorial
);
// router.put("/videoTutorial/:id", authenticateJWT, adminMiddleware, videoTutorialController.updateVideoTutorial);
// router.delete("/videoTutorial/:id", authenticateJWT, adminMiddleware, videoTutorialController.deleteVideoTutorial);

module.exports = router;
