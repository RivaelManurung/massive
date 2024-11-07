// UserNavbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaBook, FaVideo, FaComments, FaUserCircle } from "react-icons/fa";

const UserNavbar = ({ isLoggedIn, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  const isActive = (path) => (location.pathname === path ? 'bg-lime-600 font-bold' : 'hover:bg-lime-600');

  return (
    <nav className="navbar bg-transparent text-white shadow-lg px-6">
      <div className="flex-1">
        <Link to="/" className="btn text-lime-400 btn-ghost normal-case text-2xl font-bold">
          AgriLearn
        </Link>
      </div>

      <div className="hidden md:flex flex-none items-center space-x-4">
        <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">
          <li>
            <Link to="/" className={`flex items-center ${isActive("/")}`}>
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/article" className={`flex items-center ${isActive("/article")}`}>
              <FaBook className="mr-2" /> Article
            </Link>
          </li>
          <li>
            <Link to="/videos" className={`flex items-center ${isActive("/videos")}`}>
              <FaVideo className="mr-2" /> Videos
            </Link>
          </li>
          <li>
            <Link to="/forum" className={`flex items-center ${isActive("/forum")}`}>
              <FaComments className="mr-2" /> Forum
            </Link>
          </li>
        </ul>

        {/* Profile Icon or Sign Up Button */}
        <div className="relative">
          {isLoggedIn ? (
            <button className="btn btn-ghost" onClick={toggleProfileMenu}>
              <FaUserCircle size={24} />
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline text-white border-lime-400 hover:bg-lime-600">
              Login
            </Link>
          )}
          
          {/* Profile Dropdown */}
          {isProfileOpen && isLoggedIn && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2">
              <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              {isAdmin && (
                <Link to="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </Link>
              )}
              <Link to="/signout" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <button className="btn btn-ghost" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 text-primary shadow-md md:hidden">
          <ul className="menu menu-vertical px-4 py-2 space-y-2">
            <li>
              <Link to="/" onClick={toggleMenu} className={`flex items-center ${isActive("/")}`}>
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link to="/article" onClick={toggleMenu} className={`flex items-center ${isActive("/article")}`}>
                <FaBook className="mr-2" /> Article
              </Link>
            </li>
            <li>
              <Link to="/videos" onClick={toggleMenu} className={`flex items-center ${isActive("/videos")}`}>
                <FaVideo className="mr-2" /> Videos
              </Link>
            </li>
            <li>
              <Link to="/forum" onClick={toggleMenu} className={`flex items-center ${isActive("/forum")}`}>
                <FaComments className="mr-2" /> Forum
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile" onClick={toggleMenu} className="flex items-center">
                    <FaUserCircle className="mr-2" /> Profile
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/admin/dashboard" onClick={toggleMenu} className="flex items-center">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/signout" onClick={toggleMenu} className="flex items-center">
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={toggleMenu} className="flex items-center">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
