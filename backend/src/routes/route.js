const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const categoryArtikelController = require("../controller/categoryArtikelController");
const artikelController = require("../controller/artikelController");
const categoryVideoController = require("../controller/categoryVideoController");
const videoTutorialController = require("../controller/videoTutorialController");
const authenticateJWT = require("../middleware/middleware.js");

// --- USER ROUTES --- 
router.post("/register", userController.createNewUser); // Registrasi 
router.post("/login", userController.loginUser); // Login 
router.post("/logout", userController.logoutUser); // Logout 
router.get("/getAllUser", userController.getAllUsers); // Get all users 

// --- CATEGORY ARTIKEL ROUTES --- 
router.get("/categoryArtikel", categoryArtikelController.getAllCategoryArtikel); // Get all categories 
router.post("/categoryArtikel", categoryArtikelController.createNewCategoryArtikel); // Create new category 
router.put("/categoryArtikel/:id", categoryArtikelController.updateCategoryArtikel); // Update category 
router.delete("/categoryArtikel/:id", categoryArtikelController.deleteCategoryArtikel); // Delete category 

// --- ARTIKEL ROUTES --- 
router.get("/artikel", artikelController.getAllArtikel); // Get all artikels 
router.post("/artikel", artikelController.createNewArtikel); // Create new artikel 
router.put("/artikel/:id", artikelController.updateArtikel); // Update artikel 
router.delete("/artikel/:id", artikelController.deleteArtikel); // Delete artikel 


// --- CATEGORY VIDEO ROUTES --- 
router.get("/categoryVideo", categoryVideoController.getAllCategoryVideo); // Get all categories
router.post("/categoryVideo", categoryVideoController.createNewCategoryVideo); // Create new category
router.put("/categoryVideo/:id", categoryVideoController.updateCategoryVideo); // Update category
router.delete("/categoryVideo/:id", categoryVideoController.deleteCategoryVideo); // Delete category

// --- VIDEO TUTORIAL ROUTES --- 
router.get("/videoTutorial", videoTutorialController.getAllVideoTutorials); // Get all video tutorials
router.post("/videoTutorial", videoTutorialController.createNewVideoTutorial); // Create new video tutorial
router.put("/videoTutorial/:id", videoTutorialController.updateVideoTutorial); // Update video tutorial by ID
router.delete("/videoTutorial/:id", videoTutorialController.deleteVideoTutorial); // Delete video tutorial by ID

module.exports = router;
