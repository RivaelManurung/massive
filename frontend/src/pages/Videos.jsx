import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideosAndCategories = async () => {
      try {
        const [videosResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:4000/videoTutorial"),
          axios.get("http://localhost:4000/categoryVideo"),
        ]);

        if (videosResponse.status === 200) {
          setVideos(videosResponse.data);
        } else {
          setError("Failed to fetch videos");
        }

        if (categoriesResponse.status === 200) {
          setCategories(categoriesResponse.data);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideosAndCategories();
  }, []);

  // Filter videos based on selected category
  const filteredVideos = videos.filter(video => {
    return selectedCategory === "All" || video.category === selectedCategory; // Ensure this matches the property in your video data
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage);

  // Function to handle video card click
  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`); // Navigate to the detailed video page
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  if (loading) {
    return <div className="text-center text-lg">Loading videos...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error fetching videos: {error}</div>;
  }

  if (filteredVideos.length === 0) {
    return <div className="text-center text-lg">No videos found</div>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h2 className="text-5xl font-extrabold mb-4 text-center">Video Tutorials</h2>
      <p className="text-lg text-gray-600 text-center mb-12">
        Explore our collection of video tutorials designed to enhance your skills.
      </p>

      {/* Category Filter Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Filter by Category</h2>
        <div className="flex space-x-4">
          <button
            className={`btn ${selectedCategory === "All" ? "bg-black text-white" : "bg-white text-black"} border border-black`}
            onClick={() => handleCategoryChange("All")}
          >
            All
          </button>
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

      {/* Video Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentVideos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={handleVideoClick} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            className={`btn ${currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"}`}
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"} border border-black`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button 
            className={`btn ${currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"}`}
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

const VideoCard = ({ video, onClick }) => (
  <div
    className="card card-bordered shadow-md transition-transform transform hover:scale-105 cursor-pointer"
    onClick={() => onClick(video.id)} // This should now work since handleVideoClick is defined
  >
    <figure>
      <img
        src={`http://localhost:4000${video.thumbnailUrl}`}
        alt={video.title}
        className="w-full h-64 object-cover rounded-lg"
      />
    </figure>
    <div className="card-body">
      <h3 className="text-xl font-semibold mt-2">{video.title}</h3>
      <p className="text-sm text-gray-500">{video.category}</p> {/* Display video category */}
    </div>
  </div>
);

export default Videos;
