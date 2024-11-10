// const Forum = () => (
//     <div className="p-10">
//       <h2 className="text-3xl font-bold mb-5">Forum Discussions</h2>
//       <div className="space-y-5">
//         {["What is your favorite JS library?", "How to improve CSS skills?", "Is agriculture the future?"].map((topic) => (
//           <div key={topic} className="card bg-base-100 shadow-md">
//             <div className="card-body">
//               <h2 className="card-title">{topic}</h2>
//               <p>Join the discussion on this topic.</p>
//               <button className="btn btn-outline btn-sm">View Discussion</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
  
//   export default Forum;

import React from 'react';
import { Link } from 'react-router-dom';

const Forum = () => (
  <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
    {/* Title Section */}
    <div 
      style={{ backgroundColor: '#09734C' }} 
      className="w-full text-white text-center py-12 rounded-md mb-4 min-h-[200px]"  // Increased py to 12 and added min-h
    >
      <h1 className="text-3xl font-semibold">Selamat datang di forum diskusi AgriLearn!</h1> {/* Increased text size */}
      <h2 className="text-4xl font-bold mt-2">Belajar Seputar Sektor Pertanian</h2> {/* Increased text size */}
      <p className="text-lg font-medium mt-1">Bertukar ide & pengalaman seputar pertanian</p> {/* Increased text size */}
    </div>

    {/* New Discussion Button and Search Bar */}
    <div className="w-full max-w-4xl flex justify-between items-center mb-6">
      {/* <button className="bg-[#055941] hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md">
      <Link to="/forum copy.jsx" className="navbar-link">Video</Link>
        Buat Diskusi Baru
      </button> */}
      <button className="bg-[#055941] hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md">
        <Link to="/diskusi.jsx" className="text-white">Buat Diskusi Baru</Link>
      </button>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l3.85 3.86a1 1 0 11-1.42 1.42l-3.85-3.86zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari judul diskusi..."
            className="border border-gray-300 rounded-md pl-10 px-4 py-2 w-80 bg-[#F3F3F3] placeholder-black"
          />
        </div>
        <button className="bg-[#055941] text-white font-semibold px-4 py-2 rounded-md">Cari</button>
      </div>
    </div>

    {/* Discussion Cards */}
    <div className="w-full max-w-4xl space-y-4">
      {[
        { user: 'Destina Manurung', time: '2 bulan yang lalu', title: 'Pertanian Berkelanjutan di Era Modern', content: 'Bagaimana praktik pertanian berkelanjutan dapat diterapkan di era modern yang penuh tantangan lingkungan?' },
        { user: 'Rivael Manurung', time: '6 bulan yang lalu', title: 'Pengaruh Perubahan Iklim terhadap Produksi Pertanian', content: 'Bagaimana perubahan iklim mempengaruhi sektor pertanian, dan apa langkah yang bisa diambil untuk mengatasinya?' },
        { user: 'Resa H Manurung', time: '8 bulan yang lalu', title: 'Penyuluhan Pertanian untuk Petani Kecil', content: 'Mengapa penyuluhan pertanian penting untuk petani kecil dan bagaimana teknologi dapat mendukungnya?' },
        { user: 'Nita Simangunsong', time: '11 bulan yang lalu', title: 'Teknologi Digital dalam Pertanian', content: 'Apa dampak positif dan negatif penggunaan teknologi digital dalam pertanian?' },
      ].map((discussion, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-md border border-gray-200">
          <div className="flex items-center mb-1 space-x-2">
            <span className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            <p className="text-gray-700 text-lg font-bold">{discussion.user}</p>
            <span className="text-gray-500">•</span>
            <p className="text-sm text-gray-500 font-semibold">{discussion.time}</p>
          </div>
          <h2 className="text-lg font-bold text-black">{discussion.title}</h2>
          <p className="text-black mt-2 mb-4">{discussion.content}</p>
          <button className="flex items-center text-black font-semibold underline text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4V4zm0-2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm3 10h8v2H7v-2zm0-4h8v2H7V8z" />
            </svg>
            Balas
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Forum;
