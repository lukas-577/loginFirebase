import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Asegúrate de importar esto
import firebaseConfig from '../credentials.json';

const FirebaseConfig = firebaseConfig;

// Inicializar Firebase
export const app = initializeApp(FirebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

// Inicializar Firestore
const db = getFirestore(app);

// Exportar Firestore
export { db };
