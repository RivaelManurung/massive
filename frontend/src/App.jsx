import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import AdminNavbar from "./components/AdminNavbar";
import UserNavbar from "./components/UserNavbar";
import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import Forum from "./pages/Forum";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

function App() {
  // State untuk menentukan apakah pengguna adalah admin atau tidak
  const [isAdmin, setIsAdmin] = useState(false); // Atur ke true jika pengguna adalah admin
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login pengguna

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Tampilkan navbar sesuai role */}
        {isAdmin ? <AdminNavbar /> : <UserNavbar />}

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route
              path="/forum"
              element={
                isLoggedIn ? (
                  <Forum />
                ) : (
                  <Navigate to="/login" /> // Jika belum login, arahkan ke halaman login
                )
              }
            />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
