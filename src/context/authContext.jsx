import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase.js'

export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error('not AuthProvider')
    }
    return context
}

function AuthProvider({ children }) {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)



    const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password)       



    const login = (email,password) =>
        signInWithEmailAndPassword(auth,email,password)


    const logout = signOut(auth)


    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth, currentUSer=>{
            //console.log(currentUSer)
            setUser(currentUSer);
            setLoading(false);
        })
        return()=> unsuscribe()
    },[])


    return <authContext.Provider value={{ signup, login, user, logout, loading }}>{children}</authContext.Provider>;
}

export { AuthProvider };