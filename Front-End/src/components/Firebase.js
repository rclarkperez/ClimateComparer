// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnnJq0EsMQ-BEi5v7AkEjZHVtwB4F40eQ",
  authDomain: "climatecomparer.firebaseapp.com",
  projectId: "climatecomparer",
  storageBucket: "climatecomparer.appspot.com",
  messagingSenderId: "864340262102",
  appId: "1:864340262102:web:a12b98b274173ea9f9dd77"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig)
export const firestore = getFirestore(Firebase)

