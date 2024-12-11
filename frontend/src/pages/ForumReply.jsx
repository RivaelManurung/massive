import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Reply = () => {
  const { id } = useParams();  // Get the discussion ID from the URL
  const navigate = useNavigate();  // Use navigate for navigation
  const [replyContent, setReplyContent] = useState('');
  const [discussion, setDiscussion] = useState(null);  // State to hold the original discussion data

  // Fetch the original discussion by ID
  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/forum/${id}`);
        setDiscussion(response.data);
      } catch (error) {
        console.error('Error fetching discussion:', error);
        setDiscussion(null); // Set to null or show an error message
      }
    };
    fetchDiscussion();
  }, [id]);
  

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyContent) {
      alert('Please enter a reply.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/forum/${id}/reply`, 
        { content: replyContent }
      );
      alert('Reply submitted successfully');
      navigate(`/forum/${id}`); // Redirect to the specific forum discussion page
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('There was an error submitting your reply.');
    }
  };

  if (!discussion) {
    return <div>Loading...</div>; // Display loading state if discussion is not fetched yet
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Reply to Discussion</h1>

      {/* Original Discussion */}
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-bold text-black">{discussion.title}</h2>
        <p className="text-lg text-gray-700 mt-2">{discussion.content}</p>
        
        <div className="mt-4">
          <h3 className="font-semibold">Keywords:</h3>
          <div className="flex flex-wrap gap-2">
            {discussion.keywords && discussion.keywords.length > 0 ? (
              discussion.keywords.map((keyword, index) => (
                <span key={index} className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">No keywords available</span>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form */}
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Your Reply</h2>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="border border-gray-300 rounded-md w-full h-40 p-4 mb-4"
          placeholder="Type your reply here..."
        />

        <button
          onClick={handleReplySubmit}
          className="bg-[#055941] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          Submit Reply
        </button>
      </div>
    </div>
  );
};

export default Reply;
