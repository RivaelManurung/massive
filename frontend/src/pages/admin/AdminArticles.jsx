import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import axios from "axios"; // Make sure to install axios for making HTTP requests

const AdminArticles = () => {
  const [articles, setArticles] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To handle any error during fetch
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await axios.get("http://localhost:4000/artikel"); // Corrected API endpoint
      // Check if the response is an array before setting the state
      if (Array.isArray(response.data)) {
        setArticles(response.data);
      } else {
        console.error("Data is not an array", response.data);
        setError("Failed to fetch articles. Invalid data format.");
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setError("An error occurred while fetching articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/artikel/${id}`); // Corrected API endpoint
      setArticles(articles.filter((article) => article.id !== id)); // Remove deleted article from state
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:4000/artikel/${id}`, updatedData); // Corrected API endpoint
      fetchArticles(); // Refresh articles after update
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  const handleCreate = async (newArticle) => {
    try {
      await axios.post("http://localhost:4000/artikel", newArticle); // Corrected API endpoint
      fetchArticles(); // Refresh articles after create
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          width: "100%",
          maxWidth: "1150px",
          backgroundColor: "#055941",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "22px" }}>Artikel</h2>
      </div>

      {/* Add Article Button */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/add-article")} // Corrected navigate call
          style={{
            backgroundColor: "#055941",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "150px",
            height: "40px",
            marginLeft: "75px",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>+</span>
          Tambah Artikel
        </button>
      </div>

      {/* Error Message */}
      {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}

      {/* Search */}
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "relative", width: "250px" }}>
          <input
            type="text"
            placeholder="Search articles..."
            style={{
              width: "100%",
              height: "45px",
              padding: "10px 15px 10px 45px",
              borderRadius: "25px",
              border: "2px solid #000",
              fontSize: "16px",
              outline: "none",
              color: "#333",
              backgroundColor: "#fff",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "15px",
              transform: "translateY(-50%)",
              color: "#000",
            }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ width: "20px", height: "20px", color: "#000" }}
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l3.85 3.86a1 1 0 11-1.42 1.42l-3.85-3.86zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Articles Table */}
      <table
        style={{
          width: "100%",
          maxWidth: "1150px",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          margin: "20px 0",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#055941", color: "#fff" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>No</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Kategori</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Judul</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Isi</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Gambar</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Loading...
              </td>
            </tr>
          ) : (
            articles.map((article, index) => (
              <tr key={article.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px", color: "#000" }}>{index + 1}</td>
                <td style={{ padding: "10px", color: "#000" }}>
                  Swadaya Pertanian
                </td>
                <td style={{ padding: "10px", color: "#000" }}>
                  {article.title}
                </td>
                <td style={{ padding: "10px", color: "#000" }}>
                  {article.description}
                </td>
                <td style={{ padding: "10px" }}>
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt="Article"
                      style={{ width: "100px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() =>
                      handleUpdate(article.id, {
                        title: "Updated Title",
                        description: "Updated Description",
                      })
                    }
                  >
                    <img
                      src={editIcon}
                      alt="Edit"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </button>
                  <button onClick={() => handleDelete(article.id)}>
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticles;
