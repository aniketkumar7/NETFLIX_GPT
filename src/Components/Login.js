import { checkValidData } from "../Utils/validate";
import Header from "./Header";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { BG_URL, USER_AVATAR } from "../Utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    setIsLoading(true);

    const message = checkValidData(
      email.current.value,
      password.current.value
    );

    if (message) {
      setErrorMessage(message);
      setIsLoading(false);
      return;
    }

    // SignIn / SignUp Logic
    if (!isSignInForm) {
      // SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((error) => {
          // Format error message to be more user-friendly
          let friendlyError = error.message;
          if (error.code === "auth/email-already-in-use") {
            friendlyError = "This email is already registered. Please sign in instead.";
          }

          setErrorMessage(friendlyError);
          setIsLoading(false);
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          // Format error message to be more user-friendly
          let friendlyError = error.message;
          if (error.code === "auth/wrong-password") {
            friendlyError = "Incorrect password. Please try again.";
          } else if (error.code === "auth/user-not-found") {
            friendlyError = "No account found with this email. Please sign up.";
          }

          setErrorMessage(friendlyError);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
    setErrorMessage(null);

    // Clear input fields when toggling form
    if (name.current) name.current.value = "";
    if (email.current) email.current.value = "";
    if (password.current) password.current.value = "";
  };

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Form Container */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black bg-opacity-80 p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold text-white mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <div className="mb-4">
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-4 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              ref={email}
              type="email"
              placeholder="Email Address"
              className="p-4 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-6 relative">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-4 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-500 rounded-md">
              <p className="text-red-500 text-sm">{errorMessage}</p>
            </div>
          )}

          <button
            className={`w-full p-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-6 text-gray-300 text-center">
            {isSignInForm ? "New to Netflix?" : "Already have an account?"}{" "}
            <span
              className="text-red-500 hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign Up now" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
