const Videos = () => (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-5">Video Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {["Intro to React", "Tailwind Basics", "DaisyUI Tutorial"].map((video) => (
          <div key={video} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{video}</h2>
              <iframe
                className="w-full h-40"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title={video}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default Videos;
  