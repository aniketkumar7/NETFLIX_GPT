// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiee9Wl6w7elvYAflouZKUnBpeZo-F4Uc",
  authDomain: "netflixgpt-d5a95.firebaseapp.com",
  projectId: "netflixgpt-d5a95",
  storageBucket: "netflixgpt-d5a95.appspot.com",
  messagingSenderId: "759403148313",
  appId: "1:759403148313:web:54621c8452cb31aca3e688",
  measurementId: "G-7V2BX321DW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();