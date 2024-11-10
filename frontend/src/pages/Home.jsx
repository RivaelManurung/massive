import React from "react";
import {
  FaUsers,
  FaLeaf,
  FaSeedling,
  FaBookReader,
  FaArrowRight,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa";
import farmImage from "../assets/images-1.jpg";
import { Link } from 'react-router-dom'; // Tambahkan ini

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8">
          <div className="lg:w-1/2">
            <img
              src={farmImage}
              className="rounded-lg shadow-2xl w-full h-[400px] object-cover hover:scale-105 transition duration-300"
              alt="Agriculture"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="badge badge-success gap-2 mb-4">
              <FaLeaf /> Platform Pembelajaran Pertanian
            </div>
            <h1 className="text-5xl text-black font-bold leading-tight">
              Belajar Pertanian{" "}
              <span className="text-green-600">Untuk Masa Depan</span>
            </h1>
            <p className="py-6 text-black text-base-content/70 text-lg">
              Platform pembelajaran digital yang membantu petani meningkatkan
              produktivitas dan keberlanjutan pertanian melalui teknologi modern
              dan praktik terbaik.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/article">
                <button className="btn btn-green-600 btn-lg">
                  Mulai Belajar <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Fitur Unggulan
            </h2>
            <p className="text-4xl font-bold">
              Cara Lebih Baik untuk Belajar Pertanian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaBookReader className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title">Materi Terstruktur</h3>
                <p>Kurikulum yang dirancang khusus untuk pemula hingga ahli</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-green-600 text-white btn-sm">
                    Selengkapnya
                  </button>{" "}
                  {/* Button color changed */}
                </div>
              </div>
            </div>

            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title">Komunitas Aktif</h3>
                <p>Forum diskusi untuk berbagi pengalaman dan pengetahuan</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-green-600 btn-sm">
                    Selengkapnya
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaSeedling className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title">Praktik Langsung</h3>
                <p>Panduan step-by-step untuk implementasi di lapangan</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-green-600 btn-sm">
                    Selengkapnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Apa Kata Petani?
            </h2>
            <p className="text-4xl font-bold">Cerita dan Inspirasi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
                <p>
                  "Dengan platform ini, saya belajar teknik baru yang
                  meningkatkan hasil panen saya."
                </p>
                <div className="mt-4 text-right">— Budi, Petani Padi</div>
              </div>
            </div>

            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
                <p>
                  "Komunitasnya sangat membantu, banyak ilmu dan pengalaman yang
                  dibagikan."
                </p>
                <div className="mt-4 text-right">— Siti, Petani Sayur</div>
              </div>
            </div>

            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
                <p>
                  "Panduan praktiknya sangat jelas dan mudah diterapkan di
                  lapangan."
                </p>
                <div className="mt-4 text-right">— Andi, Petani Buah</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
