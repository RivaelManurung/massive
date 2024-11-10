import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaBook, FaVideo, FaComments, FaUserCircle } from "react-icons/fa";

// Notification
const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Login Diperlukan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <p className="text-gray-600 mt-2 mb-4">Anda perlu login untuk mengakses Forum.</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="btn btn-secondary border-gray-400 text-gray-700 hover:bg-gray-100">
            Tutup
          </button>
          <Link to="/login" className="btn btn-primary text-white bg-lime-600 hover:bg-lime-700">
            Ke Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const UserNavbar = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  const isActive = (path) => (location.pathname === path ? 'bg-lime-600 font-bold' : 'hover:bg-lime-600');

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleForumClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate("/forum");
    }
  };

  return (
    <nav style={{ backgroundColor: '#055941' }} className="navbar text-white shadow-lg px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          <img src="/src/assets/logo.png" alt="AgriLearn Logo" className="h-16 w-auto -mt-2" />
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
              <FaBook className="mr-2" /> Artikel
            </Link>
          </li>
          <li>
            <Link to="/videos" className={`flex items-center ${isActive("/videos")}`}>
              <FaVideo className="mr-2" /> Video
            </Link>
          </li>
          <li>
            <button onClick={handleForumClick} className={`flex items-center ${isActive("/forum")}`}>
              <FaComments className="mr-2" /> Forum
            </button>
          </li>
        </ul>

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

          {isProfileOpen && isLoggedIn && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2">
              <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                Profil
              </Link>
              {isAdmin && (
                <Link to="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </Link>
              )}
              <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
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
                <FaBook className="mr-2" /> Artikel
              </Link>
            </li>
            <li>
              <Link to="/videos" onClick={toggleMenu} className={`flex items-center ${isActive("/videos")}`}>
                <FaVideo className="mr-2" /> Video
              </Link>
            </li>
            <li>
              <button onClick={handleForumClick} className={`flex items-center ${isActive("/forum")}`}>
                <FaComments className="mr-2" /> Forum
              </button>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile" onClick={toggleMenu} className="flex items-center">
                    <FaUserCircle className="mr-2" /> Profil
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
                  <button onClick={handleSignOut} className="flex items-center w-full text-left">
                    Logout
                  </button>
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

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default UserNavbar;
