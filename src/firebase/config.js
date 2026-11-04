// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC30ZCFeRQzQy_L3FvsqrMJHbUWPZJrhBc",
  authDomain: "nordico-9f8ee.firebaseapp.com",
  projectId: "nordico-9f8ee",
  storageBucket: "nordico-9f8ee.firebasestorage.app",
  messagingSenderId: "568208663460",
  appId: "1:568208663460:web:5cb5c395598cbc45f71731",
  measurementId: "G-QHZDJLCM8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);