import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/videoTutorial");
        if (response.status === 200) {
          console.log(response.data);
          setVideos(response.data);
        } else {
          setError("Failed to fetch videos");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading videos...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error fetching videos: {error}</div>;
  }

  if (videos.length === 0) {
    return <div className="text-center text-lg">No videos found</div>;
  }

  // Function to handle video card click
  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`); // Navigate to the detailed video page
  };

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold mb-5 text-center">Video Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="card bg-base-100 shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleVideoClick(video.id)} // Click handler to navigate
          >
            <div className="card-body p-5">
              <h3 className="card-title text-lg font-semibold mb-3">{video.title}</h3>
              <div className="relative">
                <img
                  className="w-full h-40 rounded-md shadow cursor-pointer"
                  src={`http://localhost:4000${video.thumbnailUrl}`} // Use thumbnail URL for preview
                  alt={video.title}
                  onClick={() => handleVideoClick(video.id)} // Click to navigate
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer"
                  onClick={() => handleVideoClick(video.id)} // Click to play
                >
                  <span className="text-2xl">▶</span> {/* Play icon */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
