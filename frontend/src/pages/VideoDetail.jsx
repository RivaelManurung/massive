import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoDetail = () => {
  const { id } = useParams(); // Get the video ID from the URL parameters
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/videoTutorial/${id}`);
        if (response.status === 200) {
          setVideo(response.data);
        } else {
          setError("Failed to fetch video details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div>Loading video details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold mb-5">{video.title}</h2>
      <iframe
        className="w-full h-96 rounded-md shadow"
        src={`http://localhost:4000${video.videoUrl}`} // Ini akan memberikan URL yang tepat
        title={video.title}
        allowFullScreen
      ></iframe>
      <p className="mt-5">{video.description}</p> {/* Assuming you have a description field */}
    </div>
  );
};

export default VideoDetail;
