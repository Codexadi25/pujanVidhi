// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWpW20QaW_VWvvScZxtHikKbGNjTZTncI",
  authDomain: "poojanvidhi-48a4f.firebaseapp.com",
  projectId: "poojanvidhi-48a4f",
  storageBucket: "poojanvidhi-48a4f.firebasestorage.app",
  messagingSenderId: "602072810808",
  appId: "1:602072810808:web:2a9f9a0a76be2f223d6dcd",
  measurementId: "G-B4JPVPPL9H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;
