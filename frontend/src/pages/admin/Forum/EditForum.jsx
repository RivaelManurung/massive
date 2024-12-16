import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditForum = () => {
  const { id } = useParams(); // Get the dynamic :id from the URL
  const [forum, setForum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/forum/${id}`);
        setForum(response.data);
      } catch (error) {
        setError("An error occurred while fetching the forum.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchForum();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedForum = {
        title: forum.title,
        content: forum.content,
        keywords: forum.keywords,
      };
      await axios.put(`http://localhost:4000/forum/${id}`, updatedForum);
      alert("Forum updated successfully!");
    } catch (error) {
      setError("Failed to update forum.");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">Edit Forum</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block">Title:</label>
          <input
            type="text"
            value={forum.title}
            onChange={(e) => setForum({ ...forum, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Content:</label>
          <textarea
            value={forum.content}
            onChange={(e) => setForum({ ...forum, content: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block">Keywords:</label>
          <input
            type="text"
            value={forum.keywords.join(", ")}
            onChange={(e) => setForum({ ...forum, keywords: e.target.value.split(",") })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Update Forum
        </button>
      </form>
    </div>
  );
};

export default EditForum;
