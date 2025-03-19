// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyj5teLkkg6vO5uMmm46eDWD2k9Vt8lL0",
  authDomain: "otp-project-5ce6c.firebaseapp.com",
  projectId: "otp-project-5ce6c",
  storageBucket: "otp-project-5ce6c.firebasestorage.app",
  messagingSenderId: "805489989061",
  appId: "1:805489989061:web:0ca7d1f1311b6201e467ac",
  measurementId: "G-G51Y6E6HY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);