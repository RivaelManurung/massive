// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaBars, FaTimes, FaHome, FaBook, FaVideo, FaComments, FaUserCircle } from "react-icons/fa";

// const LoginModal = ({ onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white p-6 rounded-lg shadow-xl w-96 transition-all transform scale-105">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Login Diperlukan</h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-all">
//           <FaTimes size={20} />
//         </button>
//       </div>
//       <p className="text-gray-600 mb-4">Anda perlu login untuk mengakses Forum.</p>
//       <div className="flex justify-center gap-4">
//         <button onClick={onClose} className="btn btn-secondary text-gray-700 hover:bg-gray-100 transition-all">
//           Tutup
//         </button>
//         <Link to="/login" className="btn btn-primary bg-gradient-to-r from-lime-600 to-green-700 text-white hover:scale-105 transition-transform">
//           Ke Login
//         </Link>
//       </div>
//     </div>
//   </div>
// );

// const UserNavbar = ({ isLoggedIn, setIsLoggedIn, isAdmin }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

//   const isActive = (path) => (location.pathname === path ? 'bg-gradient-to-r from-green-600 to-lime-700 text-white' : 'hover:bg-lime-600 transition-all');

//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleForumClick = () => !isLoggedIn ? setIsModalOpen(true) : navigate("/forum");

//   return (
//     <>
//       <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-green-800 to-lime-600 shadow-lg px-6 py-4 transition-all">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
//             <img src="/src/assets/logo.png" alt="AgriLearn Logo" className="h-16 w-auto -mt-2" />
//           </Link>

//           <div className="hidden md:flex items-center space-x-4">
//             <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">
//               <li><Link to="/" className={`flex items-center rounded-lg px-4 py-2 ${isActive("/")}`}><FaHome className="mr-2" /> Home</Link></li>
//               <li><Link to="/article" className={`flex items-center rounded-lg px-4 py-2 ${isActive("/article")}`}><FaBook className="mr-2" /> Artikel</Link></li>
//               <li><Link to="/videos" className={`flex items-center rounded-lg px-4 py-2 ${isActive("/videos")}`}><FaVideo className="mr-2" /> Video</Link></li>
//               <li><button onClick={handleForumClick} className={`flex items-center rounded-lg px-4 py-2 ${isActive("/forum")}`}><FaComments className="mr-2" /> Forum</button></li>
//             </ul>

//             <div className="relative">
//               {isLoggedIn ? (
//                 <button className="btn btn-ghost" onClick={toggleProfileMenu}><FaUserCircle size={24} /></button>
//               ) : (
//                 <Link to="/login" className="btn btn-outline text-white border-lime-400 hover:bg-lime-600 transition-all">Masuk</Link>
//               )}
//               {isProfileOpen && isLoggedIn && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2">
//                   <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Profil</Link>
//                   {isAdmin && <Link to="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>}
//                   <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="md:hidden flex items-center">
//             <button className="btn btn-ghost" onClick={toggleMenu}>{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</button>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="absolute top-16 left-0 w-full bg-white text-primary shadow-md md:hidden rounded-lg transition-transform transform translate-y-2">
//             <ul className="menu menu-vertical px-4 py-2 space-y-2 font-semibold">
//               <li><Link to="/" onClick={toggleMenu} className={`flex items-center ${isActive("/")}`}><FaHome className="mr-2" /> Home</Link></li>
//               <li><Link to="/article" onClick={toggleMenu} className={`flex items-center ${isActive("/article")}`}><FaBook className="mr-2" /> Artikel</Link></li>
//               <li><Link to="/videos" onClick={toggleMenu} className={`flex items-center ${isActive("/videos")}`}><FaVideo className="mr-2" /> Video</Link></li>
//               <li><button onClick={handleForumClick} className={`flex items-center ${isActive("/forum")}`}><FaComments className="mr-2" /> Forum</button></li>
//               {isLoggedIn ? (
//                 <>
//                   <li><Link to="/profile" onClick={toggleMenu} className="flex items-center"><FaUserCircle className="mr-2" /> Profil</Link></li>
//                   {isAdmin && <li><Link to="/admin/dashboard" onClick={toggleMenu} className="flex items-center">Dashboard</Link></li>}
//                   <li><button onClick={handleSignOut} className="flex items-center w-full text-left">Keluar</button></li>
//                 </>
//               ) : (
//                 <li><Link to="/login" onClick={toggleMenu} className="flex items-center">Masuk</Link></li>
//               )}
//             </ul>
//           </div>
//         )}
//       </nav>

//       {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
//     </>
//   );
// };

// export default UserNavbar;
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const LoginModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login Diperlukan</h2>
      <p className="text-gray-600 mb-4">Anda perlu login untuk mengakses Forum.</p>
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="btn btn-ghost">Tutup</button>
        <Link to="/login" className="btn btn-primary">Ke Login</Link>
      </div>
    </div>
  </div>
);

const UserNavbar = ({ isLoggedIn, setIsLoggedIn, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleForumClick = () => {
    if (!isLoggedIn) setIsModalOpen(true);
    else navigate("/forum");
  };

  return (
    <>
      <nav className="navbar bg-gradient-to-r from-green-700 to-lime-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="btn btn-ghost normal-case text-2xl">AgriLearn</Link>

          <div className="hidden lg:flex space-x-4">
            <Link to="/" className={`btn btn-ghost ${location.pathname === "/" ? "btn-active" : ""}`}>Home</Link>
            <Link to="/article" className={`btn btn-ghost ${location.pathname === "/article" ? "btn-active" : ""}`}>Artikel</Link>
            <Link to="/videos" className={`btn btn-ghost ${location.pathname === "/videos" ? "btn-active" : ""}`}>Video</Link>
            <button onClick={handleForumClick} className="btn btn-ghost">Forum</button>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost">
                  <FaUserCircle size={24} />
                </label>
                <ul tabIndex={0} className="dropdown-content bg-white shadow rounded-box w-48 text-black">
                  <li><Link to="/profile" className="py-2 px-4 hover:bg-gray-100">Profil</Link></li>
                  {isAdmin && <li><Link to="/admin/dashboard" className="py-2 px-4 hover:bg-gray-100">Dashboard</Link></li>}
                  <li><button onClick={handleSignOut} className="py-2 px-4 hover:bg-gray-100">Keluar</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline">Masuk</Link>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost lg:hidden">
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <ul className="menu menu-compact bg-white shadow rounded-lg text-black">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/article" onClick={() => setIsMenuOpen(false)}>Artikel</Link></li>
              <li><Link to="/videos" onClick={() => setIsMenuOpen(false)}>Video</Link></li>
              <li><button onClick={handleForumClick}>Forum</button></li>
              {isLoggedIn && (
                <>
                  <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profil</Link></li>
                  {isAdmin && <li><Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>}
                  <li><button onClick={handleSignOut}>Keluar</button></li>
                </>
              )}
              {!isLoggedIn && <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Masuk</Link></li>}
            </ul>
          </div>
        )}
      </nav>

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default UserNavbar;
