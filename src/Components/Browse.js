import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { removegptMovieResult } from "../Utils/gptSlice";

const Browse = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Load all movie data
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTrendingMovies();
  useUpcomingMovies();

  const gptview = useSelector((store) => store.gpt.gptSearchView);
  const movies = useSelector((store) => store.movie);
  const dispatch = useDispatch();

  // Clear GPT results when switching to browse view
  useEffect(() => {
    if (!gptview) {
      dispatch(removegptMovieResult());
    }
  }, [gptview, dispatch]);

  // Set loading state based on movie data
  useEffect(() => {
    if (movies?.nowPlayingMovies) {
      // Add a small delay for smoother transition
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [movies]);

  // Prevent body scrolling when needed
  useEffect(() => {
    // Add overflow-hidden to body to prevent any potential horizontal scrolling
    document.body.style.overflowX = "hidden";

    return () => {
      // Clean up when component unmounts
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="text-white min-h-screen bg-black overflow-x-hidden w-full relative">
      <Header />

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-red-600 text-xl">Loading amazing content...</div>
        </div>
      ) : (
        <div className="w-full">
          {gptview ? (
            <div className="pt-16 md:pt-20 px-4 max-w-screen-2xl mx-auto">
              <GptSearch />
            </div>
          ) : (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Browse;
