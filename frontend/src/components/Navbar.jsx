import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaList, FaBook, FaVideo, FaComments } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleMenu = () => setIsOpen(!isOpen);

  // Function to check if the link is active
  const isActive = (path) => (location.pathname === path ? 'bg-lime-600 font-bold' : 'hover:bg-lime-600');

  return (
    <nav className="navbar bg-transparent text-white shadow-lg px-6">
      <div className="flex-1">
        <Link to="/" className="btn text-lime-400 btn-ghost normal-case text-2xl font-bold">
         AgriLearn
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">
          <li>
            <Link to="/" className={`flex items-center ${isActive("/")}`}>
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          {/* <li>
            <Link to="/categories" className={`flex items-center ${isActive("/categories")}`}>
              <FaList className="mr-2" /> Categories
            </Link>
          </li> */}
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
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button className="btn btn-ghost" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 text-primary shadow-md md:hidden">
          <ul className="menu menu-vertical px-4 py-2 space-y-2">
            <li>
              <Link to="/" onClick={toggleMenu} className={`flex items-center ${isActive("/")}`}>
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            {/* <li>
              <Link to="/categories" onClick={toggleMenu} className={`flex items-center ${isActive("/categories")}`}>
                <FaList className="mr-2" /> Categories
              </Link>
            </li> */}
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
