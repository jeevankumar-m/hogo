// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyA-6O00rvbHBZzV352A0CTI6LnVqTLs5wE",
  authDomain: "hogo-309d3.firebaseapp.com",
  projectId: "hogo-309d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the services you need
export { auth, db };