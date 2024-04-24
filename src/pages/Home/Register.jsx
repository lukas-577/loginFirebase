import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const navegate = useNavigate()
    const { signup } = useAuth()


    const handleChange = ({ target: { type, value } }) => {
        setUser({
            ...user,
            [type]: value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const registrado = await signup(user.email, user.password);
            if(registrado){
                navegate('/')
            }
            else{
                console.log("Error")
            }
        } catch (error) {
            setError(error.message)
            console.log("error:"+ error.message)
        }

    }


    return (
        <div>
            {error && <h1>{error}</h1>}
            <form onSubmit={handelSubmit}>
                <h1>Register</h1>
                <input type="email" placeholder="email" onChange={handleChange} />
                <input type="password" placeholder="password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>

    )
}

export default Register