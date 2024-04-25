import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const navegate = useNavigate()
    const { login } = useAuth()


    const handleChange = ({ target: {name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        setError("");
        try {
            await login(user.email, user.password);
            navegate('/')
        } catch (error) {
            //setError(error.message)
            if(error.code === "auth/invalid-email"){
                setError("correo invalido")
            }
            if(error.code === "auth/missing-password"){
                setError("no ingreso el password")
            }
            if(error.code === "auth/weak-password"){
                setError("la password tiene que ser mayor a 6 caracteres")
            }
            if(error.code === "auth/email-already-in-use"){
                setError("el usuario ya esta registrado")
            }
            console.log("error:"+ error.message)
        }

    }


    return (
        <div>
            {error && <h1>{error}</h1>}
            <form onSubmit={handelSubmit}>
                <h1>Login</h1>
                <input type="email" name="email" placeholder="email" onChange={handleChange} />
                <input type="password" name="password" placeholder="*********" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>

    )
}

export default Login