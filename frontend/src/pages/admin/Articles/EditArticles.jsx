import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryArtikelId, setCategoryArtikelId] = useState(1); // Adjust as needed
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/artikel/${id}`);
        const article = response.data;
        setTitle(article.title);
        setDescription(article.description);
        setCategoryArtikelId(article.categoryArtikelId);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleUpdate = async () => {
    const updatedArticle = { title, description, categoryArtikelId };

    try {
      await axios.put(`http://localhost:4000/artikel/${id}`, updatedArticle);
      navigate("/"); // Redirect to the admin articles page after update
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  return (
    <div className="p-5 font-sans">
      <div className="w-full max-w-screen-lg bg-[#055941] text-white p-4 rounded-xl flex items-center">
        <h2 className="text-xl font-semibold">Edit Artikel</h2>
      </div>

      <div className="mt-5">
        <input
          type="text"
          placeholder="Judul Artikel"
          className="input input-bordered w-full mb-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Deskripsi Artikel"
          className="textarea textarea-bordered w-full mb-5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleUpdate}
          className="btn bg-[#055941] text-white w-40 mx-auto"
        >
          Update Artikel
        </button>
      </div>
    </div>
  );
};

export default EditArticle;
