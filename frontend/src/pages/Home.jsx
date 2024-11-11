import React from "react";
import {
  FaUsers,
  FaLeaf,
  FaSeedling,
  FaBookReader,
  FaVideo,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";
import farmImage from "../assets/images-1.jpg";
import { Link } from "react-router-dom";

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
            <p className="py-6 text-black text-lg">
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

      {/* About Section */}
      {/* <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Tentang Kami
            </h2>
            <p className="text-lg text-gray-700">
              Kami adalah platform edukasi pertanian yang berkomitmen untuk
              mendukung petani di seluruh Indonesia dengan memberikan akses
              mudah ke informasi terkini, praktik terbaik, dan teknologi yang
              relevan. Di sini, petani dapat belajar, berbagi pengalaman, dan
              mengembangkan keterampilan yang dibutuhkan untuk mencapai
              pertanian yang lebih produktif dan berkelanjutan.
            </p>
          </div>
        </div>
      </div> */}

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
            {/* Artikel */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaBookReader className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title">Artikel Terbaru</h3>
                <p>
                  Konten artikel yang kaya informasi untuk menambah pengetahuan
                  Anda.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/article">
                    <button className="btn btn-green-600 text-white btn-sm">
                      Selengkapnya
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaVideo className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title">Video Pembelajaran</h3>
                <p>
                  Video tutorial interaktif untuk pembelajaran yang lebih
                  efektif.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/videos">
                    <button className="btn btn-green-600 btn-sm">
                      Selengkapnya
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Forum */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title">Forum Diskusi</h3>
                <p>
                  Tempat berdiskusi, berbagi pengetahuan, dan pengalaman antar
                  anggota.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/forum">
                    <button className="btn btn-green-600 btn-sm">
                      Selengkapnya
                    </button>
                  </Link>
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

          <div className="overflow-x-scroll space-x-4 flex">
            {/* Testimonial Cards */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="min-w-[300px] card bg-white shadow-xl mx-2 flex-shrink-0"
              >
                <div className="card-body">
                  <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
                  <p className="text-black">
                    {index === 0 &&
                      `"Dengan platform ini, saya belajar teknik baru yang meningkatkan hasil panen saya."`}
                    {index === 1 &&
                      `"Komunitasnya sangat membantu, banyak ilmu dan pengalaman yang dibagikan."`}
                    {index === 2 &&
                      `"Panduan praktiknya sangat jelas dan mudah diterapkan di lapangan."`}
                    {index === 3 &&
                      `"Saya jadi lebih memahami cara merawat tanaman agar lebih produktif."`}
                    {index === 4 &&
                      `"Dukungan dari komunitas sangat membantu saya menghadapi tantangan sehari-hari."`}
                  </p>
                  <div className="mt-4 text-right text-black">
                    —{" "}
                    {index === 0
                      ? "Budi, Petani Padi"
                      : index === 1
                      ? "Siti, Petani Sayur"
                      : index === 2
                      ? "Andi, Petani Buah"
                      : index === 3
                      ? "Tono, Petani Cabai"
                      : "Dewi, Petani Buah"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
