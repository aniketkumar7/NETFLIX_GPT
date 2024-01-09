import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../Utils/moviesSlice";
import { API_OPTIONS } from "../Utils/constant";

const useUpcomingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const UpcomingMovies = useSelector((store) => store.movies.popularMovies);

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !UpcomingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;