import { useSelector } from "react-redux";
import MovieList from "./MovieList";


const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);

  return (
    <div className="bg-black">
      <div className="lg:px-12 md:px-8 sm:px-6 px-4 lg:-mt-60 xl:-mt-64 md:-mt-2 sm:mt-4 relative z-20">
        {movies.nowPlayingMovies && (
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        )}
        {movies.TopRatedMovies && (
          <MovieList title={"Top Rated"} movies={movies.TopRatedMovies} />
        )}
        {movies.trendingMovies && (
          <MovieList title={"Trending Now"} movies={movies.trendingMovies} />
        )}
        {movies.upcomingMovies && (
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        )}
        {movies.PopularMovies && (
          <MovieList title={"Popular"} movies={movies.PopularMovies} />
        )}
      </div>
    </div>
  );

};
export default SecondaryContainer;
