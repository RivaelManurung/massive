import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryArtikelId, setCategoryArtikelId] = useState(1); // Adjust as needed
  const navigate = useNavigate();

  const handleCreate = async () => {
    const newArticle = { title, description, categoryArtikelId };

    try {
      await axios.post("http://localhost:4000/artikel", newArticle);
      navigate("/"); // Redirect to the admin articles page after creation
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <div className="p-5 font-sans">
      <div className="w-full max-w-screen-lg bg-[#055941] text-white p-4 rounded-xl flex items-center">
        <h2 className="text-xl font-semibold">Tambah Artikel</h2>
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
          onClick={handleCreate}
          className="btn bg-[#055941] text-white w-40 mx-auto"
        >
          Tambah Artikel
        </button>
      </div>
    </div>
  );
};

export default CreateArticle;
