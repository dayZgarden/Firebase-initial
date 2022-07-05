// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe2Ab9wCNmLP_qcmCIyHOyjP0JQTnaRb4",
  authDomain: "fir-practice-5ee98.firebaseapp.com",
  projectId: "fir-practice-5ee98",
  storageBucket: "fir-practice-5ee98.appspot.com",
  messagingSenderId: "64293095218",
  appId: "1:64293095218:web:a67a3ddb915009ae0ff92b",
  measurementId: "G-WP66191FSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
