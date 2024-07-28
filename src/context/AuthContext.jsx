import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail // Importa la función de Firebase
} from "firebase/auth";
import { auth } from '../firebase.js'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('AuthProvider is missing');
    }
    return context;
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) => 
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const loginWitchGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const sendPasswordResetEmail = (email) => 
        firebaseSendPasswordResetEmail(auth, email);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log({ currentUser });
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, login, user, logout, loading, loginWitchGoogle, sendPasswordResetEmail }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
