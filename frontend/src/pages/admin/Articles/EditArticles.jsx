import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryArtikelId, setCategoryArtikelId] = useState(1);
  const [categories, setCategories] = useState([]); // State for categories
  const [image, setImage] = useState(null); // State for new image
  const [existingImage, setExistingImage] = useState(""); // State for existing image URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch article and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleResponse, categoriesResponse] = await Promise.all([
          axios.get(`http://localhost:4000/artikel/${id}`),
          axios.get("http://localhost:4000/categoryArtikel"),
        ]);

        const article = articleResponse.data;
        setTitle(article.title);
        setDescription(article.description);
        setCategoryArtikelId(article.categoryArtikelId);
        setExistingImage(article.imageUrl); // Assuming article has imageUrl
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Judul dan deskripsi tidak boleh kosong!");
      return;
    }

    const formData = new FormData();
    formData.append("judul", title); // Ensure this matches the backend
    formData.append("deskripsi", description); // Ensure this matches the backend
    formData.append("categoryArtikelId", categoryArtikelId);
    if (image) formData.append("imageUrl", image);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(`http://localhost:4000/artikel/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/articles"); // Redirect to admin articles page after update
    } catch (error) {
      console.error("Failed to update article:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      }
    }
  };

  return (
    <div className="p-5 font-sans">
      <div className="w-full max-w-screen-lg bg-[#055941] text-white p-4 rounded-xl flex items-center">
        <h2 className="text-xl font-semibold">Edit Artikel</h2>
      </div>

      <form onSubmit={handleUpdate} className="mt-5">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Judul Artikel"
          className="input input-bordered w-full mb-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Category Selection */}
        <div className="mb-5">
          <label htmlFor="category" className="block text-sm font-semibold mb-2">
            Pilih Kategori
          </label>
          <select
            id="category"
            className="select select-bordered w-full"
            value={categoryArtikelId}
            onChange={(e) => setCategoryArtikelId(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quill.js Editor for Description */}
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mb-5"
          theme="snow"
          placeholder="Deskripsi Artikel"
        />

        {/* Image Upload */}
        <div className="mb-5">
          <label htmlFor="image" className="block text-sm font-semibold mb-2">
            Upload Gambar
          </label>
          {existingImage && (
            <div className="mb-2">
              <p className="text-sm">Gambar saat ini:</p>
              <img
                src={`http://localhost:4000${existingImage}`}
                alt="Existing"
                className="w-40 h-24 object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            id="image"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-[#055941] text-white w-40 mx-auto"
        >
          Update Artikel
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
