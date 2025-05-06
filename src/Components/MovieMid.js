import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useCast from "../hooks/useCast";
import { IMG_LINK } from "../Utils/constant";
import { Link } from "react-router-dom";

const MovieMid = ({ id, info }) => {
    const [activeTab, setActiveTab] = useState("cast");
    const castSliderRef = useRef(null);
    const crewSliderRef = useRef(null);

    // State for navigation arrows
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    useCast(id);
    const castInfo = useSelector((store) => store.movie?.cast);

    // Format currency with commas and dollar sign
    const formatCurrency = (amount) => {
        if (!amount) return "N/A";
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Handle horizontal scrolling
    const scroll = (direction, ref) => {
        if (ref.current) {
            const { clientWidth } = ref.current;
            const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;

            ref.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    };

    // Check scroll position
    const checkScroll = (ref) => {
        if (!ref.current) return;

        setShowLeftArrow(ref.current.scrollLeft > 0);

        const isAtEnd =
            ref.current.scrollLeft + ref.current.clientWidth >=
            ref.current.scrollWidth - 10;

        setShowRightArrow(!isAtEnd);
    };

    // Add scroll event listener - moved before conditional return
    useEffect(() => {
        if (!castInfo) return;

        const currentRef = activeTab === "cast" ? castSliderRef.current : crewSliderRef.current;

        if (currentRef) {
            const handleScroll = () => checkScroll(currentRef);
            currentRef.addEventListener('scroll', handleScroll);
            checkScroll(currentRef);

            return () => {
                currentRef.removeEventListener('scroll', handleScroll);
            };
        }
    }, [activeTab, castInfo]);

    if (!castInfo) return null;

    const { cast, crew } = castInfo;

    // Get director from crew
    const director = crew?.find(person => person.job === "Director");

    // Get top crew members (limit to important roles)
    const keyCrewRoles = ["Director", "Producer", "Screenplay", "Writer", "Director of Photography", "Original Music Composer"];
    const keyCrew = crew?.filter(person => keyCrewRoles.includes(person.job)).slice(0, 6);

    return (
        <div className="w-full bg-black py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
                <button
                    className={`px-4 py-2 text-lg font-medium mr-4 ${activeTab === "cast"
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-400 hover:text-white"
                        }`}
                    onClick={() => setActiveTab("cast")}
                >
                    Cast
                </button>
                <button
                    className={`px-4 py-2 text-lg font-medium mr-4 ${activeTab === "crew"
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-400 hover:text-white"
                        }`}
                    onClick={() => setActiveTab("crew")}
                >
                    Crew
                </button>
                <button
                    className={`px-4 py-2 text-lg font-medium ${activeTab === "details"
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-400 hover:text-white"
                        }`}
                    onClick={() => setActiveTab("details")}
                >
                    Details
                </button>
            </div>

            {/* Cast Tab */}
            {activeTab === "cast" && (
                <div className="relative group">
                    {/* Left Arrow */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll("left", castSliderRef)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Cast Slider */}
                    <div
                        ref={castSliderRef}
                        className="flex overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                        style={{
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {cast?.map((person) => (
                            <div
                                key={`${person?.id}-${person?.character}`}
                                className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] mx-2 first:ml-0 last:mr-0 bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                <div className="aspect-[2/3] relative">
                                    {person?.profile_path ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={IMG_LINK + person?.profile_path}
                                            alt={person?.name}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                            <span className="text-gray-400 text-4xl">👤</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                                        {person?.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate">
                                        {person?.character}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    {showRightArrow && (
                        <button
                            onClick={() => scroll("right", castSliderRef)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-label="Scroll right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {/* Crew Tab */}
            {activeTab === "crew" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {keyCrew?.map((person) => (
                        <div key={`${person?.id}-${person?.job}`} className="bg-zinc-800/50 p-4 rounded-lg">
                            <h3 className="text-white font-medium">{person?.name}</h3>
                            <p className="text-gray-400 text-sm">{person?.job}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Status */}
                        <div>
                            <h3 className="text-gray-400 text-sm mb-1">Status</h3>
                            <p className="text-white text-lg font-medium">{info?.status || "N/A"}</p>
                        </div>

                        {/* Original Language */}
                        <div>
                            <h3 className="text-gray-400 text-sm mb-1">Original Language</h3>
                            <p className="text-white text-lg font-medium">
                                {info?.original_language?.toUpperCase() || "N/A"}
                            </p>
                        </div>

                        {/* Budget */}
                        <div>
                            <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
                            <p className="text-white text-lg font-medium">{formatCurrency(info?.budget)}</p>
                        </div>

                        {/* Revenue */}
                        <div>
                            <h3 className="text-gray-400 text-sm mb-1">Revenue</h3>
                            <p className="text-white text-lg font-medium">{formatCurrency(info?.revenue)}</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Director */}
                        {director && (
                            <div>
                                <h3 className="text-gray-400 text-sm mb-1">Director</h3>
                                <p className="text-white text-lg font-medium">{director.name}</p>
                            </div>
                        )}

                        {/* Production Companies */}
                        <div>
                            <h3 className="text-gray-400 text-sm mb-1">Production Companies</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {info?.production_companies?.map(company => (
                                    <span key={company.id} className="bg-zinc-800 text-white text-sm px-3 py-1 rounded-full">
                                        {company.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <h3 className="text-gray-400 text-sm mb-1">Rating</h3>
                            <div className="flex items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${info?.vote_average >= 7 ? 'bg-green-900/30 border-2 border-green-500' :
                                        info?.vote_average >= 5 ? 'bg-yellow-900/30 border-2 border-yellow-500' :
                                            'bg-red-900/30 border-2 border-red-500'
                                    }`}>
                                    <span className="text-white font-bold">{info?.vote_average?.toFixed(1)}</span>
                                </div>
                                <span className="text-white">
                                    from {info?.vote_count?.toLocaleString()} votes
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-800">
                        <h3 className="text-white text-lg font-medium mb-4">Connect with the Developer</h3>
                        <div className="flex gap-4">
                            <Link
                                target="_blank"
                                to={"https://www.instagram.com/_vivekkhule_/"}
                                className="bg-gradient-to-tr from-purple-600 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform"
                                aria-label="Instagram"
                            >
                                <i className="ri-instagram-line text-white text-xl"></i>
                            </Link>
                            <Link
                                target="_blank"
                                to={"https://github.com/VKoder"}
                                className="bg-gray-800 p-3 rounded-full hover:scale-110 transition-transform"
                                aria-label="GitHub"
                            >
                                <i className="ri-github-fill text-white text-xl"></i>
                            </Link>
                            <Link
                                target="_blank"
                                to={"https://www.linkedin.com/in/vivek-khule-237682250/"}
                                className="bg-blue-700 p-3 rounded-full hover:scale-110 transition-transform"
                                aria-label="LinkedIn"
                            >
                                <i className="ri-linkedin-box-fill text-white text-xl"></i>
                            </Link>
                            <Link
                                target="_blank"
                                to={"https://twitter.com/VivekKhule"}
                                className="bg-black p-3 rounded-full hover:scale-110 transition-transform"
                                aria-label="Twitter"
                            >
                                <i className="ri-twitter-x-fill text-white text-xl"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieMid;
