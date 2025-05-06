import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnowPlayingMovies } from "../Utils/moviesSlice";
import { FETCH_OPTIONS } from "../Utils/constant";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movie?.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing",
        FETCH_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const json = await data.json();
      dispatch(addnowPlayingMovies(json.results));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, [nowPlayingMovies]);
};

export default useNowPlayingMovies;
