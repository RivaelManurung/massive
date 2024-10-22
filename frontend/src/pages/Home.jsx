const Home = () => (
  <section className="hero min-h-[60vh] bg-base-100 relative overflow-hidden">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <img 
        src="../assets/cis.jpg" 
        className="max-w-sm rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105" 
        alt="A clean and organized home" 
      />
      <div className="lg:max-w-lg p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-green-600 mb-4">Time to Get Your House Clean and in Order</h1>
        <p className="py-6 text-gray-700">
          Discover the science behind keeping your home fresh, clean, and healthy with our expert insights.
        </p>
        <button className="btn btn-secondary transition duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
    {/* Background Decoration */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-blue-300 opacity-50"></div>
  </section>
);

export default Home;
