import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMovieInfo from "../hooks/useMovieInfo";
import Header from "./Header";
import { useSelector } from "react-redux";
import { IMG_LINK } from "../Utils/constant";
import MovieInfoTop from "./MovieInfoTop";
import MovieMid from "./MovieMid";
import ShimmerUI from "./ShimmerUI";
import MovieBottom from "./MovieBottom";

const MovieInfo = () => {
    const { id } = useParams();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMovieInfo(id);
    const info = useSelector((store) => store.movie?.movieInfo);

    // Handle scroll effect for header transparency
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scrolling until content is ready
    useEffect(() => {
        document.body.style.overflowX = "hidden";

        return () => {
            document.body.style.overflowX = "";
        };
    }, []);

    if (!info) {
        return (
            <div className="min-h-screen bg-black">
                <Header />
                <div className="pt-20">
                    <ShimmerUI />
                </div>
            </div>
        );
    }

    const backdropPath = info?.belongs_to_collection?.backdrop_path || info?.backdrop_path;

    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
            {/* Semi-transparent Header with scroll effect */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
                <Header />
            </div>

            {/* Background Image with Parallax Effect */}
            <div className="fixed h-screen w-full top-0 left-0 -z-10 overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black animate-pulse"></div>
                )}
                <img
                    className={`w-full h-full object-cover object-center brightness-[.25] scale-105 transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    src={IMG_LINK + backdropPath}
                    alt={info?.title || "Movie Background"}
                    onLoad={() => setImageLoaded(true)}
                    style={{ transform: `translateY(${scrolled ? -20 : 0}px)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Movie Info Sections */}
                    <MovieInfoTop info={info} />
                    <MovieMid id={info?.id} info={info} />
                    <MovieBottom id={info?.id} />

                    {/* Footer */}
                    <div className="py-8 mt-12 text-center text-gray-400 text-sm border-t border-gray-800">
                        <p>© {new Date().getFullYear()} Netflix-GPT • Movie data provided by TMDB</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
