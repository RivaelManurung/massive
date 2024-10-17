const jwt = require("jsonwebtoken");

// Middleware untuk memverifikasi token JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Ambil token dari header

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" }); // Forbidden
      }

      req.user = user; // Tambahkan informasi user ke req object
      next(); // Lanjutkan ke handler berikutnya
    });
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" }); // Unauthorized
  }
};

// Middleware untuk memastikan hanya admin yang bisa mengakses
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" }); // Forbidden jika bukan admin
  }
  next(); // Lanjutkan jika user adalah admin
};

module.exports = {
  authenticateJWT,
  adminMiddleware,
};
