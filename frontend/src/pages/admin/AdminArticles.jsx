import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  const fetchArticlesAndCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const [articlesResponse, categoriesResponse] = await Promise.all([
        axios.get("http://localhost:4000/artikel"),
        axios.get("http://localhost:4000/categoryArtikel"),
      ]);
      setArticles(articlesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/artikel/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  const truncateDescription = (description) => {
    const sentences = description.split(". ");
    const truncated = sentences.slice(0, 3).join(". ");
    return truncated + (sentences.length > 3 ? "..." : "");
  };

  return (
    <div className="p-5 font-sans">
      <div className="bg-[#055941] text-white p-4 rounded-lg flex items-center">
        <h2 className="text-lg font-semibold">Artikel</h2>
      </div>

      <div className="mt-4">
        <button
          onClick={() => navigate("/add-article")}
          className="bg-[#055941] text-white py-2 px-4 rounded-lg shadow hover:bg-[#044c37]"
        >
          + Tambah Artikel
        </button>
      </div>

      {error && <div className="text-red-600 mt-4">{error}</div>}

      <table className="w-full mt-6 border border-gray-300 rounded-lg">
        <thead className="bg-[#055941] text-white">
          <tr>
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Kategori</th>
            <th className="py-2 px-4 text-left">Judul</th>
            <th className="py-2 px-4 text-left">Isi</th>
            <th className="py-2 px-4 text-left">Gambar</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            articles.map((article, index) => {
              const category =
                categories.find((cat) => cat.id === article.categoryArtikelId)
                  ?.name || "No Category";

              return (
                <tr key={article.id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{category}</td>
                  <td className="py-2 px-4">{article.title}</td>
                  <td className="py-2 px-4">{truncateDescription(article.description)}</td>
                  <td className="py-2 px-4">
                    {article.imageUrl ? (
                      <img
                        src={`http://localhost:4000${article.imageUrl}`}
                        alt="Article"
                        className="w-24 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-article/${article.id}`)}
                      className="bg-blue-500 text-white py-1 px-2 rounded shadow hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded shadow hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticles;
