import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Forum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/forum");
        console.log(response.data); // Cek data yang diterima
        setDiscussions(response.data);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions();
  }, []);

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReplyClick = (id) => {
    navigate(`/reply/${id}`); // Navigate to the reply page for the discussion
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title Section */}
      <div
        style={{ backgroundColor: "#09734C" }}
        className="w-full text-white text-center py-12 rounded-md mb-4 min-h-[200px]"
      >
        <h1 className="text-3xl font-semibold">
          Selamat datang di forum diskusi AgriLearn!
        </h1>
        <h2 className="text-4xl font-bold mt-2">
          Belajar Seputar Sektor Pertanian
        </h2>
        <p className="text-lg font-medium mt-1">
          Bertukar ide & pengalaman seputar pertanian
        </p>
      </div>

      {/* New Discussion Button and Search Bar */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button className="bg-[#055941] hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md">
          <Link to="/diskusi.jsx" className="text-white">
            Buat Diskusi Baru
          </Link>
        </button>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.42-1.42l3.85 3.86a1 1 0 11-1.42 1.42l-3.85-3.86zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari judul diskusi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md pl-10 px-4 py-2 w-80 bg-[#F3F3F3] placeholder-black"
            />
          </div>
          <button className="bg-[#055941] text-white font-semibold px-4 py-2 rounded-md">
            Cari
          </button>
        </div>
      </div>

      {/* Discussion Cards */}
      <div className="w-full max-w-4xl space-y-4">
        {filteredDiscussions.length === 0 ? (
          <p className="text-gray-700">Tidak ada diskusi yang ditemukan.</p>
        ) : (
          filteredDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white p-4 rounded-md shadow-md border border-gray-200"
            >
              <div className="flex items-center mb-1 space-x-2">
                <span className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </span>
                <p className="text-gray-700 text-lg font-bold">
                  {discussion.userName}
                </p>
                <span className="text-gray-500">•</span>
                <p className="text-sm text-gray-500 font-semibold">
                  {discussion.createdAt}
                </p>
              </div>
              <h2 className="text-lg font-bold text-black">
                {discussion.title}
              </h2>
              <p className="text-black mt-2 mb-4">{discussion.content}</p>

              {/* Display Keywords */}
              {discussion.keywords &&
              Array.isArray(discussion.keywords) &&
              discussion.keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {discussion.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No keywords available</p>
              )}

              <button className="flex items-center text-black font-semibold underline text-sm">
                <Link
                  to={`/forum/${discussion.id}/reply`}
                  className="flex items-center text-black font-semibold underline text-sm"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4V4zm0-2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm3 10h8v2H7v-2zm0-4h8v2H7V8z" />
                  </svg>
                  Balas
                </Link>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;
