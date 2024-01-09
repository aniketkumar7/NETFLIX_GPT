import MovieCard from "./MovieCard";
import React from "react";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-2">
      <h1 className="text-lg md:text-3xl mt-3 font-semibold py-4 text-white">{title}</h1>
      <div id="scrollable" className="flex overflow-x-scroll overflow-y-hidden">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;