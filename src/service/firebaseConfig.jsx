// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_RWTqfa6zgT-Scly144tyD-_xg5ze4tU",
  authDomain: "travel-planner-78620.firebaseapp.com",
  projectId: "travel-planner-78620",
  storageBucket: "travel-planner-78620.firebasestorage.app",
  messagingSenderId: "3628808723",
  appId: "1:3628808723:web:17d70fc162bca11248dde6",
  measurementId: "G-FVSFHBY6PC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);