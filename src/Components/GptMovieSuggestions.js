import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  const [isVisible, setIsVisible] = useState(false);

  // Add a subtle animation when results appear
  useEffect(() => {
    if (movieNames && movieNames.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [movieNames]);

  if (!movieNames || movieNames.length === 0) return null;

  return (
    <div
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
          AI Recommended Movies For You
        </h2>

        <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6">
          {movieNames.map((movieName, index) => {
            // Skip rendering if no results found for this movie
            if (!movieResults[index]?.results || movieResults[index].results.length === 0) {
              return null;
            }

            return (
              <div key={movieName + index} className="mb-8 last:mb-0">
                <MovieList
                  title={movieName}
                  movies={movieResults[index].results}
                />
                {index < movieNames.length - 1 && (
                  <div className="border-b border-gray-800 my-6"></div>
                )}
              </div>
            );
          })}

          {/* If no movies were found at all */}
          {movieNames.length > 0 && movieResults.every(result => !result?.results || result.results.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try a different search term.</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Recommendations powered by AI based on your search query.</p>
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
