import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../Utils/moviesSlice";
import { API_OPTIONS } from "../Utils/constant";

const useTrendingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const TrendingMovies = useSelector((store) => store.movies.popularMovies);

  const getTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(() => {
    !TrendingMovies && getTrendingMovies();
  }, []);
};

export default useTrendingMovies;