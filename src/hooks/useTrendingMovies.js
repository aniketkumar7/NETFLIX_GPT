import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../Utils/moviesSlice";
import { FETCH_OPTIONS } from "../Utils/constant";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  // Use store.movie (singular) not store.movies (plural)
  const trendingMovies = useSelector((store) => store.movie?.trendingMovies);

  const getTrendingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/movie/week?&page=1",
        FETCH_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const json = await data.json();
      dispatch(addTrendingMovies(json.results));
      return "success";
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return "error";
    }
  };

  useEffect(() => {
    if (!trendingMovies) {
      getTrendingMovies();
    }
  }, [trendingMovies]);

  // Return loading status to help with UI state management
  return trendingMovies ? "success" : "loading";
};

export default useTrendingMovies;
