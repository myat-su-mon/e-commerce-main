import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2abourQOBxvuEE2LePBl1j5dCmwO9DaI",
  authDomain: "e-commerce-f0dd2.firebaseapp.com",
  projectId: "e-commerce-f0dd2",
  storageBucket: "e-commerce-f0dd2.appspot.com",
  messagingSenderId: "324904630336",
  appId: "1:324904630336:web:3af162760c9b02b31c07a5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);