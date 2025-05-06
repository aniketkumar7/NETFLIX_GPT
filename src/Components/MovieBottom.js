import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useSimilarMovies from "../hooks/useSimilarMovies";
import { IMG_LINK } from "../Utils/constant";

const MovieBottom = ({ id }) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const sliderRef = useRef(null);

    useSimilarMovies(id);
    const similarMovies = useSelector((store) => store.movie?.similarMovies);

    // Check if we have valid similar movies data
    const hasMovies = similarMovies && similarMovies.length > 0;

    // Handle scroll check
    useEffect(() => {
        const checkScroll = () => {
            if (!sliderRef.current) return;

            setShowLeftArrow(sliderRef.current.scrollLeft > 0);

            const isAtEnd =
                sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
                sliderRef.current.scrollWidth - 10;

            setShowRightArrow(!isAtEnd);
        };

        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();

            // Check on window resize
            window.addEventListener('resize', checkScroll);
        }

        return () => {
            if (slider) {
                slider.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [similarMovies]);

    // Handle scroll navigation
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

    if (!hasMovies) return null;

    return (
        <section className="py-12 bg-black/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    More Like This
                </h2>

                <div className="relative group">
                    {/* Left Arrow */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Movie Slider */}
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                        style={{
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        }}
                    >
                        <style jsx="true">{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>

                        {similarMovies.map((movie) => (
                            <Link
                                to={`/movieinfo/${movie.id}`}
                                key={movie.id}
                                className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] mx-2 first:ml-0 last:mr-0 transition-transform duration-300 hover:scale-105"
                            >
                                <div className="rounded-lg overflow-hidden shadow-lg bg-zinc-800">
                                    {/* Movie Poster */}
                                    <div className="aspect-[2/3] relative">
                                        {movie.poster_path ? (
                                            <img
                                                src={IMG_LINK + movie.poster_path}
                                                alt={movie.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}

                                        {/* Rating Badge */}
                                        {movie.vote_average > 0 && (
                                            <div className="absolute bottom-2 right-2 bg-black/80 rounded-full w-10 h-10 flex items-center justify-center">
                                                <span className={`text-xs font-bold ${movie.vote_average >= 7 ? 'text-green-500' :
                                                        movie.vote_average >= 5 ? 'text-yellow-500' : 'text-red-500'
                                                    }`}>
                                                    {movie.vote_average.toFixed(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Movie Info */}
                                    <div className="p-3">
                                        <h3 className="text-white font-medium text-sm truncate">
                                            {movie.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {movie.release_date?.slice(0, 4) || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    {showRightArrow && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                            aria-label="Scroll right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Gradient fades on sides for better visual effect */}
                    <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black/80 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default MovieBottom;
