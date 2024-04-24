import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error('not AuthProvider')
    }
    return context
}

function AuthProvider({ children }) {

    const user = {
        login: true,
    }

    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                throw new Error(error)
            });
    }

    return <authContext.Provider value={{ signup }}>{children}</authContext.Provider>;
}

export { AuthProvider };