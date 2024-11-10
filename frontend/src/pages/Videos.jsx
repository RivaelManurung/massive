import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../components/FormatDate"; // Assuming you have a similar date formatter
import { FaPlay } from "react-icons/fa"; // Importing play icon from react-icons

const VIDEOS_API_URL = "http://localhost:4000/videoTutorial";
const CATEGORIES_API_URL = "http://localhost:4000/categoryVideo";
const itemsPerPage = 6;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosResponse, categoriesResponse] = await Promise.all([
          axios.get(VIDEOS_API_URL),
          axios.get(CATEGORIES_API_URL),
        ]);
        setVideos(videosResponse.data);
        setCategories([
          { id: "Semua", name: "Semua" },
          ...categoriesResponse.data.map((cat) => ({ id: cat.id, name: cat.name })),
        ]);
      } catch (error) {
        setError("Failed to fetch videos or categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter videos based on title and category
  const filteredVideos = videos.filter((video) => {
    const title = (video.title || "").toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || video.categoryVideoId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      {/* Search Section */}
      <div className="mb-8 flex items-center border border-gray-300 rounded bg-white">
        <span className="p-2">{/* Search Icon */}</span>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full bg-[#F3F3F3] text-black placeholder-gray-500 rounded-r-lg"
        />
      </div>

      {/* Category Filter Section */}
      <div className="mb-8 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-black">Categories Video</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="btn border border-black"
              style={{
                backgroundColor:
                  selectedCategory === category.id ? "#09734C" : "rgba(9, 115, 76, 0.22)",
                color: selectedCategory === category.id ? "white" : "black",
              }}
              onClick={() => handleCategoryChange(category.id)} // Pass category.id instead of name
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"> {/* Two cards per row */}
        {currentVideos.length > 0 ? (
          currentVideos.map((video) => {
            const { title, createdAt, description, categoryVideoId, thumbnailUrl } = video;
            const formattedDate = formatDate(createdAt); // Assuming this function formats the date
            const truncatedDescription =
              description && description.length > 100
                ? description.slice(0, 100) + "..."
                : description || "No description available";

            // Find the category name from the categories array
            const categoryName =
              categories.find((category) => category.id === categoryVideoId)?.name || "Unknown Category";

            return (
              <div
                key={video.id}
                className="card shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={() => handleVideoClick(video.id)}
              >
                <figure className="relative">
                  <img
                    src={`http://localhost:4000${thumbnailUrl}`}
                    alt={title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                </figure>
                <div className="card-body p-4">
                  <p className="text-sm text-black">{formattedDate}</p>
                  <h3 className="text-xl font-semibold mt-2 text-black">{title}</h3>
                  <p className="text-black mt-2">{truncatedDescription}</p>

                  <div className="card-actions mt-2">
                    <span
                      className="badge mr-2"
                      style={{
                        backgroundColor: "rgba(9, 115, 76, 0.22)",
                        color: "black",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {categoryName} {/* Displaying category name */}
                    </span>
                  </div>

                  <div className="flex justify-end mt-4">
                    <a href="#" className="text-teal-500 hover:text-teal-600">
                      Watch Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-black">No videos found for this category!</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className={`btn ${currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"} border border-black`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`btn ${currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Videos;
