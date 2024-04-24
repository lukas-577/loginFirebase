import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import firebaseConfig from '../credentials.json';

const FirebaseConfig = firebaseConfig;
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)