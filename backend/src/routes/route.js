const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticateJWT = require("../middleware/middleware.js");
const categoryArtikelController = require("../controller/categoryArtikelController.js");

// Route registrasi
router.post("/register", userController.createNewUser);

// Route login
router.post("/login", userController.loginUser);

// Route logout (opsional, client-side)
router.post("/logout", userController.logoutUser);

// Route untuk mendapatkan semua user (hanya untuk user yang terotentikasi)
// router.get("/users", authenticateJWT, userController.getAllUser);

// Route untuk mendapatkan semua users
router.get("/getAllUser", async (req, res) => {
  try {
    const [rows] = await userController.getAllUser();
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      ServerMessage: error,
    });
  }
});

// Route untuk mendapatkan semua kategori artikel
router.get("/categoryArtikel", async (req, res) => {
  try {
    const categories = await categoryArtikelController.getAllCategoryArtikel();
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve categories",
      ServerMessage: error,
    });
  }
});

// Route untuk membuat kategori artikel baru
router.post("/categoryArtikel", async (req, res) => {
  try {
    const newCategory = await categoryArtikelController.createNewCategoryArtikel(req.body);
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create new category",
      ServerMessage: error,
    });
  }
});

// Route untuk memperbarui kategori artikel berdasarkan id
router.put("/categoryArtikel/:id", async (req, res) => {
  try {
    const updatedCategory = await categoryArtikelController.updateCategoryArtikel(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update category",
      ServerMessage: error,
    });
  }
});

// Route untuk menghapus kategori artikel berdasarkan id
router.delete("/categoryArtikel/:id", async (req, res) => {
  try {
    const deletedCategoryId = await categoryArtikelController.deleteCategoryArtikel(req.params.id);
    res.json({
      message: "Delete category success",
      deletedCategoryId: deletedCategoryId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
      ServerMessage: error,
    });
  }
});

module.exports = router;
