// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "airline-reservation-syst-9edb0.firebaseapp.com",
  projectId: "airline-reservation-syst-9edb0",
  storageBucket: "airline-reservation-syst-9edb0.appspot.com",
  messagingSenderId: "141748761120",
  appId: "1:141748761120:web:c231a54d0387e79ff84245",
  measurementId: "G-67BM7JND0S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);