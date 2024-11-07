// AdminNavbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTags, FaFileAlt, FaVideo, FaComments, FaSignOutAlt } from 'react-icons/fa';

const AdminNavbar = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'bg-green-700 font-bold' : 'hover:bg-green-700');

  return (
    <aside className="w-72 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-green-600">Admin Dashboard</h1>
        <p className="text-gray-500">Kelola Konten dengan Mudah</p>
      </div>
      <ul className="menu p-4 space-y-2">
        <li className={`rounded-lg ${isActive("/admin")}`}>
          <Link to="/admin" className="flex items-center gap-2 px-4 py-2">
            <FaHome /> <span>Dashboard</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/categories")}`}>
          <Link to="/admin/categories" className="flex items-center gap-2 px-4 py-2">
            <FaTags /> <span>Kategori Artikel</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/articles")}`}>
          <Link to="/admin/articles" className="flex items-center gap-2 px-4 py-2">
            <FaFileAlt /> <span>Artikel</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/video-categories")}`}>
          <Link to="/admin/video-categories" className="flex items-center gap-2 px-4 py-2">
            <FaTags /> <span>Kategori Video</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/videos")}`}>
          <Link to="/admin/videos" className="flex items-center gap-2 px-4 py-2">
            <FaVideo /> <span>Video</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/forum")}`}>
          <Link to="/admin/forum" className="flex items-center gap-2 px-4 py-2">
            <FaComments /> <span>Forum</span>
          </Link>
        </li>
      </ul>
      <div className="p-4">
        <button className="btn btn-outline btn-red-500 hover:bg-red-500 hover:text-white w-full flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminNavbar;
