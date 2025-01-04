import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBL04ICqTxhOIeCONbqnCdE7jQHDNPLmoE",
  authDomain: "berimbolo-backend.firebaseapp.com",
  projectId: "berimbolo-backend",
  storageBucket: "berimbolo-backend.firebasestorage.app",
  messagingSenderId: "153638266340",
  appId: "1:153638266340:web:dcbddafd3d795a460253f1",
  measurementId: "G-C2EXSGTQYZ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)