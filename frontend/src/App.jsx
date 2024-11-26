import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import AdminNavbar from "./components/AdminNavbar";
import UserNavbar from "./components/UserNavbar";
import AdminFooter from "./components/AdminFooter";
import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import Forum from "./pages/Forum";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminForum from "./pages/admin/AdminForum";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import Profile from "./pages/Profile";
import WeatherCard from "./pages/WeatherCard";
import CreateArticle from './pages/admin/Articles/CreateArticles'; 
import EditArticle from './pages/admin/Articles/EditArticles'; 
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("isAdmin")) || false;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isLoggedIn, isAdmin]);

  return (
    <div className="min-h-screen bg-white">
      {isLoggedIn && isAdmin ? (
        // Layout for admin
        <div className="flex h-screen">
          <div className="w-64 h-full bg-gray-800">
            <AdminNavbar setIsLoggedIn={setIsLoggedIn} /> {/* Pass setIsLoggedIn */}
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex-grow overflow-y-auto p-4">
              <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/articles" element={<AdminArticles />} />
                <Route path="/add-article" element={<CreateArticle />} />
                <Route path="/edit-article/:id" element={<EditArticle />} />
                <Route path="/admin/videos" element={<AdminVideos />} />
                <Route path="/admin/forum" element={<AdminForum />} />
                <Route path="/" element={<Navigate to="/admin" />} />
              </Routes>
            </div>
            <AdminFooter />
          </div>
        </div>
      ) : (
        // Layout for user
        <div className="flex flex-col min-h-screen">
          <UserNavbar
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            setIsLoggedIn={setIsLoggedIn}
            setIsAdmin={setIsAdmin}
          />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article" element={<Article />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/video/:id" element={<VideoDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cuaca" element={<WeatherCard />} />
              <Route
                path="/forum"
                element={isLoggedIn ? <Forum /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
