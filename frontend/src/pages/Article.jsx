import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Replace with your actual API endpoints
const ARTICLES_API_URL = "http://localhost:4000/artikel";
const CATEGORIES_API_URL = "http://localhost:4000/categoryArtikel";

const itemsPerPage = 10; // Updated to 10 articles per page

const BlogPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(ARTICLES_API_URL);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORIES_API_URL);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchArticles();
    fetchCategories();
  }, []);

  // Filter articles based on selected category and search term
  const filteredArticles = articles.filter(article => {
    const matchesCategory = 
      selectedCategory === "All" || article.tags.includes(selectedCategory);

    const title = article.title || ""; // Fallback if title is undefined
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); // Reset to first page when search is submitted
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <div className="mb-8 flex items-center">
        <h2 className="text-3xl font-bold mb-6 mr-4">Search Articles</h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full mr-2"
        />
        <button 
          className="btn bg-black text-white hover:bg-gray-800" 
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </div>

      {/* Category Filter Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Filter by Category</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn ${selectedCategory === category.name ? "bg-black text-white" : "bg-white text-black"} border border-black`}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Article Blog Section */}
      <h2 className="text-3xl font-bold mb-6">Article Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={handleArticleClick} 
            />
          ))
        ) : (
          <p className="text-gray-600">No articles found for this category or search term.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className={`btn ${currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {currentPage > 2 && (
            <>
              <button 
                className="btn bg-white text-black border border-black" 
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
              {currentPage > 3 && <span className="text-black">...</span>}
            </>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"} border border-black`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span className="text-black">...</span>}
              <button 
                className="btn bg-white text-black border border-black" 
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className={`btn ${currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
const ArticleCard = ({ article, onClick }) => (
  <div
    className="card card-bordered shadow-md transition-transform transform hover:scale-105 cursor-pointer"
    onClick={() => onClick(article.id)}
  >
    <figure>
      <img
        src={article.image}
        alt={article.title || "Article Image"}
        className="w-full h-64 object-cover rounded-lg"
      />
    </figure>
    <div className="card-body">
      <p className="text-sm text-gray-500">
        {article.author} • {article.date}
      </p>
      <h3 className="text-xl font-semibold mt-2">{article.title}</h3>
      <p className="text-gray-600 mt-2">{article.excerpt}</p>
      <div className="card-actions mt-2">
        {(article.tags || []).map((tag, index) => (
          <span key={index} className="badge badge-primary">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default BlogPage;
