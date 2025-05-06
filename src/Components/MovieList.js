import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import ShimmerUI from "./ShimmerUI";
import { useRef, useState, useEffect } from "react";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (!sliderRef.current) return;

      // Show left arrow only if scrolled to the right
      setShowLeftArrow(sliderRef.current.scrollLeft > 0);

      // Show right arrow only if there's more content to scroll
      const isAtEnd =
        sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
        sliderRef.current.scrollWidth - 10; // 10px threshold

      setShowRightArrow(!isAtEnd);
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScroll);
      }
    };
  }, [movies]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;

      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (!movies) {
    return <ShimmerUI />;
  }

  return (
    <div className="lg:py-5 md:py-4 sm:py-3 py-2.5 relative group overflow-hidden">
      <span className="lg:text-2xl md:text-xl sm:text-base text-base font-semibold md:pl-3 pl-2 lg:pl-4 text-white">
        {title}
      </span>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Movie List Container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide lg:pt-5 md:pt-4 sm:pt-2.5 pt-2.5 scroll-smooth"
          style={{
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',   /* Firefox */
          }}
        >
          <div className="flex lg:gap-4 md:gap-3 gap-2 sm:gap-2 px-2">
            {movies?.map((movie) => (
              <Link
                to={"/movieinfo/" + movie?.id}
                key={movie?.id}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <MovieCard
                  poster={movie?.poster_path || movie?.profile_path}
                  title={movie?.title || movie?.original_name}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;
