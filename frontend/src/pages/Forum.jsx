const Forum = () => (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-5">Forum Discussions</h2>
      <div className="space-y-5">
        {["What is your favorite JS library?", "How to improve CSS skills?", "Is agriculture the future?"].map((topic) => (
          <div key={topic} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{topic}</h2>
              <p>Join the discussion on this topic.</p>
              <button className="btn btn-outline btn-sm">View Discussion</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default Forum;
  