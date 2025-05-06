import { LOGO } from "../Utils/constant";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice";
import { MULTI_LANG } from "../Utils/constant";
import { addLang } from "../Utils/configApp";
import lang from "../Utils/languageConstants";
import { addGptToggle } from "../Utils/gptSlice";

const Header = () => {
  const gptview = useSelector((store) => store.gpt.gptSearchView);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const langKey = useSelector((store) => store.configApp.lang);

  const toggleGPTSearchView = () => {
    // Toggle the GPT search view in Redux
    dispatch(addGptToggle());
  };

  const handlelang = (e) => {
    dispatch(addLang(e.target.value));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => { });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black absolute w-full z-50 flex justify-between items-center px-4 md:px-8 lg:px-10 py-2">
      <Link to={"/browse"}>
        <img
          className="w-20 md:w-32 lg:w-40"
          src={LOGO}
          alt="Netflix Logo"
        />
      </Link>

      {user && (
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-white hidden sm:block text-sm md:text-base truncate">
            {lang[langKey].welcome} {user.displayName}
          </span>

          {/* GPT Search Button */}
          <button
            onClick={toggleGPTSearchView}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm rounded-md py-1 px-2 md:px-3 transition-colors"
          >
            {gptview ? "Home" : lang[langKey].gptSearch}
          </button>

          <select
            className="bg-black/50 text-white border border-gray-600 text-xs md:text-sm rounded-md py-1 px-1 md:px-2"
            onChange={handlelang}
          >
            {MULTI_LANG.map((option) => (
              <option key={option.name} value={option.identifier}>
                {option.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm rounded-md py-1 px-2 md:px-3"
          >
            {lang[langKey].signOut}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
