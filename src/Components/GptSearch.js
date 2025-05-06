import { useRef, useState, useEffect } from "react";
import { FETCH_OPTIONS } from "../Utils/constant";
import { addgptMovieReult } from "../Utils/gptSlice";
import { useDispatch, useSelector } from "react-redux";
import ShimmerUI from "./ShimmerUI";
import { OpenAI } from "openai";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GPTSearch = () => {
  const searchInputRef = useRef();
  const apiKeyInputRef = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Get movie results from Redux store to check if we have results
  const { movieResults } = useSelector((store) => store.gpt);
  const hasResults = movieResults && movieResults.length > 0;

  // Check if API key exists in session storage on component mount
  useEffect(() => {
    const storedApiKey = sessionStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  // Function to search for movies using TMDB API
  const movieSearch = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie.trim()) +
        "&include_adult=false",
        FETCH_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`TMDB API error: ${data.status}`);
      }

      const json = await data.json();
      return json;
    } catch (error) {
      console.error("Error searching for movie:", error);
      return { results: [] }; // Return empty results on error
    }
  };

  // Function to save API key securely
  const handleSaveApiKey = () => {
    const enteredApiKey = apiKeyInputRef.current.value.trim();

    if (!enteredApiKey) {
      setError("Please enter a valid OpenAI API key");
      return;
    }

    // Store API key in session storage (not localStorage for security)
    // Session storage is cleared when the browser is closed
    sessionStorage.setItem("openai_api_key", enteredApiKey);
    setApiKey(enteredApiKey);
    setShowApiKeyInput(false);
    setError(null);
    setUseFallback(false);
  };

  // Function to clear API key
  const handleClearApiKey = () => {
    sessionStorage.removeItem("openai_api_key");
    setApiKey("");
    setShowApiKeyInput(true);
  };

  // Fallback movie recommendations based on search query
  const getFallbackRecommendations = (query) => {
    // Dictionary of predefined responses for common queries
    const predefinedResponses = {
      "action": ["Die Hard", "Mad Max: Fury Road", "John Wick", "The Dark Knight", "Mission Impossible"],
      "comedy": ["Superbad", "Bridesmaids", "The Hangover", "Dumb and Dumber", "Anchorman"],
      "romance": ["The Notebook", "Pride and Prejudice", "La La Land", "Titanic", "Before Sunrise"],
      "sci-fi": ["Blade Runner", "The Matrix", "Interstellar", "Arrival", "Dune"],
      "horror": ["The Shining", "Hereditary", "Get Out", "A Quiet Place", "The Exorcist"],
      "thriller": ["Silence of the Lambs", "Seven", "Gone Girl", "Parasite", "No Country for Old Men"],
      "drama": ["The Shawshank Redemption", "The Godfather", "Schindler's List", "Forrest Gump", "The Green Mile"],
      "fantasy": ["The Lord of the Rings", "Harry Potter", "Pan's Labyrinth", "The Princess Bride", "The Shape of Water"],
      "animation": ["Spirited Away", "Toy Story", "Spider-Man: Into the Spider-Verse", "Up", "The Lion King"],
      "superhero": ["The Avengers", "The Dark Knight", "Black Panther", "Wonder Woman", "Spider-Man: No Way Home"]
    };

    // Convert query to lowercase for case-insensitive matching
    const lowercaseQuery = query.toLowerCase();

    // Check if query contains any of our predefined categories
    for (const [category, movies] of Object.entries(predefinedResponses)) {
      if (lowercaseQuery.includes(category)) {
        return movies;
      }
    }

    // If no category matches, use a default set of popular movies
    if (lowercaseQuery.includes("bollywood") || lowercaseQuery.includes("indian")) {
      return ["3 Idiots", "Lagaan", "PK", "Dangal", "Bahubali"];
    } else if (lowercaseQuery.includes("classic") || lowercaseQuery.includes("old")) {
      return ["Casablanca", "Gone with the Wind", "Citizen Kane", "The Godfather", "Psycho"];
    } else {
      // Default popular movies
      return ["The Shawshank Redemption", "Inception", "Pulp Fiction", "The Godfather", "Fight Club"];
    }
  };

  // Function to get movie recommendations from OpenAI
  const getOpenAIRecommendations = async (query) => {
    if (useFallback) {
      return getFallbackRecommendations(query);
    }

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: This is needed for client-side usage
      });

      const gptSearch =
        "Act as a movie recommendation system and suggest some movies for the query " +
        query +
        ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Hera pheri, 3 idiots, hulk, dunki, red";

      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptSearch }],
        model: "gpt-3.5-turbo",
      });

      if (!response.choices || response.choices.length === 0) {
        throw new Error("No recommendations received");
      }

      return response.choices[0].message.content.split(",").map(movie => movie.trim());
    } catch (error) {
      console.error("OpenAI API error:", error);

      // Handle specific API key errors
      if (error.message?.includes("API key") || error.message?.includes("401")) {
        setError("Invalid API key. Using fallback recommendations instead.");
        handleClearApiKey();
        setUseFallback(true);
        return getFallbackRecommendations(query);
      }
      // Handle rate limit errors
      else if (error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("rate limit")) {
        setError("API rate limit exceeded. Using fallback recommendations instead.");
        setUseFallback(true);
        return getFallbackRecommendations(query);
      }
      else {
        setError("Error getting recommendations. Using fallback instead.");
        setUseFallback(true);
        return getFallbackRecommendations(query);
      }
    }
  };

  const handleGPTSearch = async () => {
    const searchQuery = searchInputRef.current.value.trim();

    if (!searchQuery) {
      setError("Please enter a search term");
      return;
    }

    if (!apiKey && !useFallback) {
      setError("Please enter your OpenAI API key first or use fallback mode");
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get movie recommendations from OpenAI or fallback
      const gptMovies = await getOpenAIRecommendations(searchQuery);

      // Search for each movie using TMDB API
      const promiseArray = gptMovies.map((movie) => movieSearch(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // Dispatch results to Redux store
      dispatch(
        addgptMovieReult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error in GPT search:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFallbackMode = () => {
    setUseFallback(!useFallback);
    if (!useFallback) {
      setShowApiKeyInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pb-16">
      {/* Search Section */}
      <div className={`pt-[10%] md:pt-[8%] px-4 ${hasResults ? 'pb-4' : 'pb-16'}`}>
        <div className="w-full max-w-2xl mx-auto bg-black/60 p-6 rounded-lg shadow-lg">
          <h2 className="text-white text-xl md:text-2xl font-bold text-center mb-6">
            AI-Powered Movie Recommendations
          </h2>

          {/* Mode Toggle */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={toggleFallbackMode}
              className={`text-sm px-4 py-2 rounded-full transition-colors ${useFallback
                  ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              {useFallback
                ? "Using Fallback Mode (No API Key Required)"
                : "Using OpenAI API (Requires API Key)"}
            </button>
          </div>

          {/* API Key Input Section - Only show if not in fallback mode */}
          {!useFallback && showApiKeyInput ? (
            <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
              <h3 className="text-white text-lg font-medium mb-2">Enter your OpenAI API Key</h3>
              <p className="text-gray-300 text-sm mb-4">
                Your API key is stored securely in your browser's session storage and will be cleared when you close the browser.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  ref={apiKeyInputRef}
                  placeholder="sk-..."
                  className="flex-grow py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Save Key
                </button>
              </div>

              <p className="text-gray-400 text-xs mt-2">
                Your API key is never sent to our servers and is only used for direct communication with OpenAI.
              </p>
            </div>
          ) : !useFallback && (
            <div className="mb-6 flex justify-between items-center">
              <span className="text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                API Key Connected
              </span>
              <button
                onClick={handleClearApiKey}
                className="text-gray-400 hover:text-white text-sm underline"
              >
                Change API Key
              </button>
            </div>
          )}

          {/* Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGPTSearch();
            }}
            className="w-full"
          >
            <div className="flex flex-col gap-4">
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow py-3 px-4 rounded-l-md text-black focus:outline-none"
                  placeholder="Try 'action movies' or 'sci-fi thrillers'..."
                  ref={searchInputRef}
                  disabled={isLoading || (!useFallback && showApiKeyInput)}
                />
                <button
                  type="submit"
                  disabled={isLoading || (!useFallback && showApiKeyInput)}
                  className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-r-md font-medium transition-colors ${(isLoading || (!useFallback && showApiKeyInput)) ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500 rounded-md">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <p className="text-gray-400 text-sm text-center">
                {useFallback
                  ? "Using built-in recommendations based on your search terms."
                  : "Search for any genre, mood, or type of movie you're interested in!"}
              </p>
            </div>
          </form>
        </div>

        {isLoading && <ShimmerUI />}
      </div>

      {/* Results Section */}
      {!isLoading && <GptMovieSuggestions />}
    </div>
  );
};

export default GPTSearch;
