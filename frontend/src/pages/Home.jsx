import React from "react";
import Footer from "../components/Footer"; // Sesuaikan path jika perlu
import agricultureImage from "../assets/images-1.jpg"; // Sesuaikan nama dan path gambar

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={agricultureImage} // Menggunakan gambar dari assets/src
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Agriculture"
          />
          <div>
            <h1 className="text-5xl font-bold text-primary">
              Welcome to Agri Learn!
            </h1>
            <p className="py-6 text-lg text-gray-600">
              Discover the future of farming with innovative tools and knowledge
              that empower the next generation of farmers. Let’s create a
              sustainable future together!
            </p>
            <a href="/get-started" className="btn btn-primary btn-lg">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-8">
            Why Choose Agri Learn?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="text-2xl font-semibold">Innovative Tools</h3>
                <p className="text-gray-600">
                  Access the latest technologies and techniques to improve your
                  farm's productivity.
                </p>
              </div>
            </div>
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="text-2xl font-semibold">Expert Guidance</h3>
                <p className="text-gray-600">
                  Learn from experienced farmers and agronomists with curated
                  resources.
                </p>
              </div>
            </div>
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="text-2xl font-semibold">Community Support</h3>
                <p className="text-gray-600">
                  Connect with like-minded young farmers and collaborate to
                  build a sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-8">
            What Farmers Say
          </h2>
          <div className="carousel w-full">
            <div id="slide1" className="carousel-item w-full">
              <div className="card w-96 bg-white shadow-xl mx-auto">
                <div className="card-body">
                  <p className="text-lg">
                    "Agri Learn has transformed how I manage my farm. The tools
                    and resources are invaluable!"
                  </p>
                  <h3 className="font-bold mt-4">- Budi Santoso</h3>
                </div>
              </div>
            </div>
            <div id="slide2" className="carousel-item w-full">
              <div className="card w-96 bg-white shadow-xl mx-auto">
                <div className="card-body">
                  <p className="text-lg">
                    "Joining Agri Learn's community has been an amazing
                    experience. I’ve learned so much!"
                  </p>
                  <h3 className="font-bold mt-4">- Siti Aminah</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full py-2 gap-2 mt-4">
            <a href="#slide1" className="btn btn-xs">
              1
            </a>
            <a href="#slide2" className="btn btn-xs">
              2
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of young farmers who are already transforming their
            farms with Agri Learn.
          </p>
          <a href="/sign-up" className="btn btn-primary btn-lg">
            Join Now
          </a>
        </div>
      </section>


    </>
  );
};

export default Home;
