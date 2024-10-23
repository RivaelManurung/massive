import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";
import Videos from "./pages/Videos"; // Importing Videos component
import VideoDetail from "./pages/VideoDetail"; // Ensure to import VideoDetail component
import Forum from "./pages/Forum";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
