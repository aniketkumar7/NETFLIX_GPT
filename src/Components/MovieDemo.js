import Header from "./Header"
const MovieDemo = () => {
    return (
        <div>
            <Header />
            <div className="h-screen w-12/12 flex justify-center items-center flex-col bg-zinc-200">
                <svg
                    className="xl:w-80 lg:w-72 md:w-64 sm:w-48 w-42"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="50" cy="50" r="40" fill="#666"/>
                    <rect x="35" y="35" width="30" height="30" fill="#999"/>
                    <path d="M20 80 L50 20 L80 80 Z" fill="#333"/>
                </svg>
                <h1 className="font-semibold lg:text-xl text-black">Still Working on this Route...!</h1>
            </div>
        </div>
    )
}
export default MovieDemo
