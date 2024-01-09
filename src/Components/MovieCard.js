import { IMG_CDN_URL } from "../Utils/constant";


const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 hover:transform hover:scale-105 duration-300 ease-in-out transition-all">
      <img className="hover:cursor-pointer" alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;