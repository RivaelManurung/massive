import React from "react";
import { useParams, Link } from "react-router-dom";
import Image1 from "../assets/images-1.jpg";
import Image2 from "../assets/images-1.jpg";
import Image3 from "../assets/images-1.jpg";

const articles = [
  {
    id: 1,
    title: "Conversations with London Makr & Co.",
    author: "Olivia Rhye",
    date: "20 Jan 2024",
    content: "We sat down with London’s fast-growing brand and product design studio...",
    image: Image1,
  },
  {
    id: 2,
    title: "A Relentless Pursuit of Perfection in Product Design",
    author: "Phoenix Baker",
    date: "19 Jan 2024",
    content: "The journey of refining a product requires relentless focus...",
    image: Image2,
  },
  {
    id: 3,
    title: "How to Run a Successful Business With Your Partner",
    author: "Lana Steiner",
    date: "18 Jan 2024",
    content: "Working with a partner can be challenging but also rewarding...",
    image: Image3,
  },
];

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <p>Article not found!</p>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        &larr; Back to Blog
      </Link>
      <h1 className="text-4xl font-extrabold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {article.author} • {article.date}
      </p>
      <img src={article.image} alt={article.title} className="w-full h-64 object-cover mb-8" />
      <p className="text-lg text-gray-700">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
