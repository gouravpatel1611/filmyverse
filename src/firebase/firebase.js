// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMN2tqV1JtMfG3w2AzYDC631Ce0qldAMw",
  authDomain: "filmy-85b3b.firebaseapp.com",
  projectId: "filmy-85b3b",
  storageBucket: "filmy-85b3b.appspot.com",
  messagingSenderId: "869967874584",
  appId: "1:869967874584:web:3ca7c119031c305800d16d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db,"users");
export default app;