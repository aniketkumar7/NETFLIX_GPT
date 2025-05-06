import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
    const [countdown, setCountdown] = useState(10);

    // Auto-redirect countdown
    useEffect(() => {
        if (countdown <= 0) {
            window.location.href = "/browse";
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-red-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-2/3 left-1/2 w-24 h-24 bg-red-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Content */}
            <div className="z-10 text-center max-w-lg">
                {/* Netflix-style logo */}
                <div className="mb-8">
                    <svg className="w-16 h-16 mx-auto text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5.398 0v24l6.018-1.672V0H5.398zm7.185 0v22.038L18.6 24V0h-6.017z" />
                    </svg>
                </div>

                {/* 404 with glitch effect */}
                <h1 className="text-7xl md:text-9xl font-bold mb-4 relative">
                    <span className="relative inline-block">
                        <span className="absolute inset-0 text-red-600 animate-pulse">404</span>
                        <span className="relative z-10">404</span>
                    </span>
                </h1>

                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Lost your way?</h2>

                <p className="text-lg text-gray-300 mb-8">
                    Sorry, we can't find the page you're looking for. You'll find lots to explore on the home page.
                </p>

                {/* Button with countdown */}
                <div className="flex flex-col items-center">
                    <Link
                        to="/browse"
                        className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        Back to Browse
                    </Link>

                    <p className="mt-6 text-gray-400">
                        Redirecting in <span className="text-white font-bold">{countdown}</span> seconds...
                    </p>
                </div>

                {/* Error code */}
                <div className="mt-12 text-gray-500 text-sm">
                    Error Code: NSES-404
                </div>
            </div>
        </div>
    );
};

export default NotFound;
