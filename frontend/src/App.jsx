// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Footer from "./components/Footer";
// import AdminNavbar from "./components/AdminNavbar";
// import UserNavbar from "./components/UserNavbar";
// import Home from "./pages/Home";
// import Article from "./pages/Article";
// import ArticleDetail from "./pages/ArticleDetail";
// import Videos from "./pages/Videos";
// import VideoDetail from "./pages/VideoDetail";
// import Forum from "./pages/Forum";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import Login from "./pages/Auth/Login";
// import RegisterPage from "./pages/Auth/Register";

// function App() {
//   const [isAdmin, setIsAdmin] = useState(() => {
//     // Retrieve admin status from localStorage on initial load
//     return JSON.parse(localStorage.getItem("isAdmin")) || false;
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     // Retrieve login status from localStorage on initial load
//     return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
//   });

//   useEffect(() => {
//     // Store login and admin status in localStorage whenever they change
//     localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
//     localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
//   }, [isLoggedIn, isAdmin]);

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         {/* Render the UserNavbar unless on the /admin route */}
//         {window.location.pathname === "/admin" && isAdmin ? (
//           <AdminNavbar isLoggedIn={isLoggedIn} />
//         ) : (
//           <UserNavbar
//             isLoggedIn={isLoggedIn}
//             isAdmin={isAdmin}
//             setIsLoggedIn={setIsLoggedIn}
//             setIsAdmin={setIsAdmin}
//           />
//         )}

//         <div className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/article" element={<Article />} />
//             <Route path="/article/:id" element={<ArticleDetail />} />
//             <Route path="/videos" element={<Videos />} />
//             <Route path="/video/:id" element={<VideoDetail />} />

//             {/* Protected route: redirect to login if not logged in */}
//             <Route
//               path="/forum"
//               element={isLoggedIn ? <Forum /> : <Navigate to="/login" />}
//             />

//             {/* Admin route: redirect to home if not admin */}
//             <Route
//               path="/admin"
//               element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
//             />

//             <Route
//               path="/login"
//               element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}
//             />
//             <Route path="/register" element={<RegisterPage />} />
//           </Routes>
//         </div>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Profile from "./pages/Profile";
import WeatherCard from "./pages/WeatherCard";

function App() {
  const location = useLocation();
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
    <div className="flex flex-col min-h-screen">
      {location.pathname.startsWith("/admin") && isAdmin ? (
        <AdminNavbar isLoggedIn={isLoggedIn} />
      ) : (
        <UserNavbar
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          setIsLoggedIn={setIsLoggedIn}
          setIsAdmin={setIsAdmin}
        />
      )}

      <div className="flex-grow bg-white">
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
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}

          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
