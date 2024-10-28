import React from 'react';
import { FaUsers } from 'react-icons/fa';
import farmImage from '../assets/images-1.jpg';
import riceImage from '../assets/images-1.jpg';

const Home = () => {
  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="hero bg-green-100 py-20 px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-[400px] lg:h-auto">
              <img
                src={farmImage}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
                alt="Terasering Sawah"
              />
            </div>
            <div className="flex flex-col justify-center lg:ml-10">
              <h1 className="text-5xl font-bold text-green-900">
                Selamat Datang di AgriLearn!
              </h1>
              <p className="py-6">
                Temukan masa depan pertanian dengan alat dan pengetahuan inovatif yang
                membangkitkan generasi petani berkembang. Mari kita ciptakan masa depan
                yang berkelanjutan bersama!
              </p>
            </div>
          </div>
        </div>

        {/* Mengapa Memilih AgriLearn */}
        <section className="py-10 max-w-screen-lg mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">
            Mengapa memilih AgriLearn
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="card bg-green-700 p-6 rounded-lg">
                <h3 className="text-xl text-white font-bold">Panduan Langsung</h3>
                <p className="mt-2 text-white">
                  Menawarkan panduan langsung dan tips praktis untuk petani
                  pemula hingga profesional.
                </p>
                <button className="btn text-white font-bold btn-link mt-4">
                  Baca Selengkapnya
                </button>
              </div>
              <div className="card bg-green-700 p-6 rounded-lg">
                <h3 className="text-xl text-white font-bold">User Friendly</h3>
                <p className="mt-2 text-white">
                  Platform yang user-friendly, memudahkan pengguna dari berbagai
                  latar belakang untuk belajar kapan saja.
                </p>
                <button className="btn text-white font-bold btn-link mt-4">
                  Baca Selengkapnya
                </button>
              </div>
              <div className="card bg-green-700 p-6 rounded-lg">
                <h3 className="text-xl text-white font-bold">Forum Diskusi</h3>
                <p className="mt-2 text-white">
                  AgriLearn memiliki forum untuk berbagi pengetahuan dan
                  pengalaman di kalangan petani.
                </p>
                <button className="btn text-white font-bold btn-link mt-4">
                  Baca Selengkapnya
                </button>
              </div>
            </div>
            <div className="h-[300px] lg:h-auto">
              <img
                src={riceImage}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                alt="Padi"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
