import { useEffect, useState } from "react";
import { FETCH_OPTIONS } from "../Utils/constant";

const VideoBackground = ({ movieid }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieVideos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use TMDB API with your existing FETCH_OPTIONS
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/videos`,
          FETCH_OPTIONS
        );

        if (!data.ok) {
          throw new Error(`Failed to fetch video data: ${data.status}`);
        }

        const json = await data.json();

        // Find trailer or fallback to any video
        const trailer = json.results.find(video =>
          video.type === "Trailer" && video.site === "YouTube"
        ) || json.results.find(video => video.site === "YouTube");

        if (trailer) {
          setVideoKey(trailer.key);
        } else {
          setError("No trailer found for this movie");
        }
      } catch (err) {
        console.error("Error fetching movie videos:", err);
        setError("Failed to load video");
      } finally {
        setIsLoading(false);
      }
    };

    if (movieid) {
      getMovieVideos();
    }
  }, [movieid]);

  if (isLoading) {
    return (
      <div className="w-full aspect-video bg-black flex items-center justify-center">
        <div className="animate-pulse text-white">Loading video...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full aspect-video bg-black flex items-center justify-center">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
