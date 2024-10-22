import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";
// import VideoTutorial from "./pages/VideoTutorial";
import Forum from "./pages/Forum";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            {/* <Route path="/videos" element={<VideoTutorial />} /> */}
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
