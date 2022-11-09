// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHDqTAX2Y-AYhonT9E-kwJID-tE03EogE",
  authDomain: "lex-v1.firebaseapp.com",
  projectId: "lex-v1",
  storageBucket: "lex-v1.appspot.com",
  messagingSenderId: "95419742090",
  appId: "1:95419742090:web:9caa5e75de1388e660ba73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth}