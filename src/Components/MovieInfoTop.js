import { IMG_LINK } from "../Utils/constant";
import { useState } from "react";

const MovieInfoTop = ({ info }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Format the release date in a more readable format
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    // Format runtime to hours and minutes
    const formatRuntime = (minutes) => {
        if (!minutes) return "";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Calculate user score as percentage
    const userScore = info?.vote_average ? Math.round(info.vote_average * 10) : 0;

    return (
        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 lg:pt-36 pb-8">
            {/* Movie Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center md:justify-start">
                <div className="relative rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
                    )}
                    <img
                        className={`w-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={IMG_LINK + info?.poster_path}
                        alt={info?.title || "Movie Poster"}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                        }}
                    />

                    {/* User score badge */}
                    <div className="absolute -bottom-3 -right-3 bg-black rounded-full p-1 shadow-lg">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${userScore >= 70 ? 'border-green-500' :
                                userScore >= 50 ? 'border-yellow-500' : 'border-red-500'
                            }`}>
                            <span className="text-white font-bold text-lg">{userScore}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Movie Details */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
                {/* Title and Year */}
                <div className="mb-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                        {info?.title}
                        <span className="text-lg sm:text-xl md:text-2xl font-normal text-gray-400 ml-2">
                            ({info?.release_date?.slice(0, 4)})
                        </span>
                    </h1>
                </div>

                {/* Movie Facts */}
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
                    <div className="text-white text-sm sm:text-base">
                        {formatDate(info?.release_date)}
                    </div>
                    <div className="text-white text-sm sm:text-base">
                        • {formatRuntime(info?.runtime)}
                    </div>
                    <div className="text-white text-sm sm:text-base">
                        • {info?.original_language?.toUpperCase()}
                    </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {info?.genres?.map((genre) => (
                        <span
                            key={genre.id}
                            className="px-3 py-1 bg-red-600/80 text-white text-xs sm:text-sm rounded-full"
                        >
                            {genre.name}
                        </span>
                    ))}
                </div>

                {/* Tagline */}
                {info?.tagline && (
                    <div className="mb-6">
                        <p className="text-gray-400 text-lg sm:text-xl italic">
                            "{info.tagline}"
                        </p>
                    </div>
                )}

                {/* Overview */}
                <div className="mb-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Overview</h3>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {info?.overview || "No overview available."}
                    </p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-auto">
                    {/* Status */}
                    <div>
                        <h4 className="text-gray-400 text-sm">Status</h4>
                        <p className="text-white text-sm sm:text-base">{info?.status}</p>
                    </div>

                    {/* Budget */}
                    {info?.budget > 0 && (
                        <div>
                            <h4 className="text-gray-400 text-sm">Budget</h4>
                            <p className="text-white text-sm sm:text-base">
                                ${(info?.budget / 1000000).toFixed(1)}M
                            </p>
                        </div>
                    )}

                    {/* Revenue */}
                    {info?.revenue > 0 && (
                        <div>
                            <h4 className="text-gray-400 text-sm">Revenue</h4>
                            <p className="text-white text-sm sm:text-base">
                                ${(info?.revenue / 1000000).toFixed(1)}M
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieInfoTop;
