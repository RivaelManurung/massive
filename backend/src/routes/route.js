const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticateJWT = require("../middleware/middleware.js");

const {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

// Route registrasi
router.post("/register", userController.createNewUser);

// Route login
router.post("/login", userController.loginUser);

// Route logout (opsional, client-side)
router.post("/logout", userController.logoutUser);

// Route untuk mendapatkan semua user (hanya untuk user yang terotentikasi)
// router.get("/users", authenticateJWT, userController.getAllUser);

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

// Route untuk mendapatkan semua categories
router.get("/categories", getAllCategories);

// Route untuk membuat category baru
router.post("/categories", createNewCategory);

// Route untuk memperbarui category berdasarkan id
router.put("/categories/:id", updateCategory);

// Route untuk menghapus category berdasarkan id
router.delete("/categories/:id", deleteCategory);

module.exports = router;


// {
//   "name" : "user",
//   "email": "user@gmail.com",
//   "password" : "user123"
// }