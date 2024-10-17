// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "authenticationapp-f62d8.appspot.com",
  messagingSenderId: "710809208686",
  appId: "1:710809208686:web:144f7d6004ad2f5316237f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
