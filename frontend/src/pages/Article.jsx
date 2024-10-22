import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../assets/images-1.jpg";
import Image2 from "../assets/images-1.jpg";
import Image3 from "../assets/images-1.jpg";

// Sample articles data
const articles = [
  {
    id: 1,
    title: "Conversations with London Makr & Co.",
    author: "Olivia Rhye",
    date: "20 Jan 2024",
    excerpt: "We sat down with London’s fast-growing brand and product design studio...",
    tags: ["Design", "Research", "Interviews"],
    image: Image1,
  },
  {
    id: 2,
    title: "A Relentless Pursuit of Perfection in Product Design",
    author: "Phoenix Baker",
    date: "19 Jan 2024",
    excerpt: '"I began to notice that there was a sharp contrast between well-made designs..."',
    tags: ["Design", "Research"],
    image: Image2,
  },
  {
    id: 3,
    title: "How to Run a Successful Business With Your Partner",
    author: "Lana Steiner",
    date: "18 Jan 2024",
    excerpt: "Starting a business with your spouse or significant other is an exciting but...",
    tags: ["Business", "Research"],
    image: Image3,
  },
  {
    id: 4,
    title: "Exploring the Future of AI in Design",
    author: "Alex Morgan",
    date: "17 Jan 2024",
    excerpt: "AI is transforming the design landscape, and here's how...",
    tags: ["AI", "Design"],
    image: Image1,
  },
  {
    id: 5,
    title: "Sustainable Practices in Product Design",
    author: "Jordan Smith",
    date: "16 Jan 2024",
    excerpt: "Sustainability is not just a trend; it's the future of design.",
    tags: ["Sustainability", "Design"],
    image: Image2,
  },
  {
    id: 6,
    title: "The Impact of Color Theory in Design",
    author: "Emma Wright",
    date: "15 Jan 2024",
    excerpt: "Color theory plays a crucial role in design decisions...",
    tags: ["Design", "Theory"],
    image: Image3,
  },
  {
    id: 7,
    title: "User Experience in Mobile Applications",
    author: "Sophia Lee",
    date: "14 Jan 2024",
    excerpt: "Designing for mobile requires a different approach...",
    tags: ["UX", "Design"],
    image: Image1,
  },
  {
    id: 8,
    title: "Building a Brand Identity That Stands Out",
    author: "Mia Chen",
    date: "13 Jan 2024",
    excerpt: "Your brand identity is more than just a logo...",
    tags: ["Branding", "Design"],
    image: Image2,
  },
  {
    id: 9,
    title: "The Role of Typography in Modern Design",
    author: "Liam Johnson",
    date: "12 Jan 2024",
    excerpt: "Typography influences how your message is perceived...",
    tags: ["Typography", "Design"],
    image: Image3,
  },
  {
    id: 10,
    title: "Designing for Accessibility: Best Practices",
    author: "Olivia Brown",
    date: "11 Jan 2024",
    excerpt: "Inclusive design benefits everyone...",
    tags: ["Accessibility", "Design"],
    image: Image1,
  },
  {
    id: 11,
    title: "Leveraging User Feedback in Design",
    author: "Elijah Scott",
    date: "10 Jan 2024",
    excerpt: "User feedback is invaluable for improving design...",
    tags: ["User Feedback", "Design"],
    image: Image2,
  },
  {
    id: 12,
    title: "The Future of Remote Work and Design",
    author: "Ava Taylor",
    date: "09 Jan 2024",
    excerpt: "Remote work is here to stay, and it’s changing the design landscape...",
    tags: ["Remote Work", "Design"],
    image: Image3,
  },
];

// Define categories for filtering
const categories = [
  "All",
  "Design",
  "Business",
  "Research",
  "AI",
  "Sustainability"
];

const itemsPerPage = 10; // Updated to 10 articles per page

const BlogPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter articles based on selected category and search term
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.tags.includes(selectedCategory);
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); // Reset to first page when search is submitted
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      {/* <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">Inside Design: Stories and Interviews</h1>
        <p className="text-lg text-gray-600">
          Discover insights into product features, technology, and design.
        </p>
      </div> */}

      {/* Search Section */}
      <div className="mb-8 flex items-center">
        <h2 className="text-3xl font-bold mb-6 mr-4">Search Articles</h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full mr-2"
        />
        <button className="btn bg-black text-white hover:bg-gray-800" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>

      {/* Category Filter Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Filter by Category</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? "bg-black text-white" : "bg-white text-black"} border border-black`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Article Blog Section */}
      <h2 className="text-3xl font-bold mb-6">Article Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onClick={handleArticleClick} />
          ))
        ) : (
          <p className="text-gray-600">No articles found for this category or search term.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className={`btn ${currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {currentPage > 2 && (
            <>
              <button className="btn bg-white text-black border border-black" onClick={() => handlePageChange(1)}>
                1
              </button>
              {currentPage > 3 && <span className="text-black">...</span>}
            </>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"} border border-black`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span className="text-black">...</span>}
              <button className="btn bg-white text-black border border-black" onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            className={`btn ${currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
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

const ArticleCard = ({ article, onClick }) => (
  <div
    className="card card-bordered shadow-md transition-transform transform hover:scale-105 cursor-pointer"
    onClick={() => onClick(article.id)}
  >
    <figure>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover rounded-lg"
      />
    </figure>
    <div className="card-body">
      <p className="text-sm text-gray-500">
        {article.author} • {article.date}
      </p>
      <h3 className="text-xl font-semibold mt-2">{article.title}</h3>
      <p className="text-gray-600 mt-2">{article.excerpt}</p>
      <div className="card-actions mt-2">
        {article.tags.map((tag, index) => (
          <span key={index} className="badge badge-primary">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default BlogPage;
