import { useSelector } from "react-redux";
import MovieList from "./MovieList";


const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Trending Now"} movies={movies.trendingMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;