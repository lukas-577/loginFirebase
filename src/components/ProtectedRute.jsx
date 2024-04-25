import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
export function ProtectedRute({children}){
    const {user,loading} = useAuth

    if(loading) return <h1>Loading</h1>

    if(!user) return <Navigate to="/login"></Navigate>


    return <>{children}</>

}