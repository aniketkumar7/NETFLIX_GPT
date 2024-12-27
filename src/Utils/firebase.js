// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5yvUL6XfxLKIqH8MQSrk_mbkxs1e6Jfc",
  authDomain: "netflix-gpt-f07e5.firebaseapp.com",
  projectId: "netflix-gpt-f07e5",
  storageBucket: "netflix-gpt-f07e5.appspot.com",
  messagingSenderId: "1072555619805",
  appId: "1:1072555619805:web:c714edf37fe69e11757234",
  measurementId: "G-JNQ1B6EW2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
