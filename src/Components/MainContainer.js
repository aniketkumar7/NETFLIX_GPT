import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  const [randomIndex, setRandomIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Select a random movie when the component mounts or movies change
  useEffect(() => {
    if (movies && movies.length > 0) {
      // Choose a random movie from the first 5 movies (they're usually the most popular)
      const index = Math.floor(Math.random() * Math.min(5, movies.length));
      setRandomIndex(index);
      setIsLoading(false);
    }
  }, [movies]);

  // Show loading state or return null if no movies are available
  if (isLoading || !movies || !randomIndex) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-red-600 text-xl">Loading...</div>
      </div>
    );
  }

  const movieInfo = movies[randomIndex];
  const { original_title, overview, id } = movieInfo;

  return (
    <div className="relative w-full">
      <div className="w-full overflow-hidden">
        <VideoBackground movieid={id} />
      </div>
      <div className="absolute top-0 left-0 w-full">
        <VideoTitle original_title={original_title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContainer;
