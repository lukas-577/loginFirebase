import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const navegate = useNavigate()
    const { signup } = useAuth()


    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        setError("");
        try {
            await signup(user.email, user.password);
            navegate('/afiliacion')
        } catch (error) {
            //setError(error.message)
            if (error.code === "auth/invalid-email") {
                setError("correo invalido")
            }
            if (error.code === "auth/missing-password") {
                setError("no ingreso el password")
            }
            if (error.code === "auth/weak-password") {
                setError("la password tiene que ser mayor a 6 caracteres")
            }
            if (error.code === "auth/email-already-in-use") {
                setError("el usuario ya esta registrado")
            }
            console.log("error:" + error.message)
        }

    }


    return (
        <>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-1 max-w-md w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">Macrofitas</h2>
                            <p>Macrofitas es una aplicacion web que te permite llevar un control de tus plantas acuaticas.</p>
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        {error && <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>}
                        <form className="card-body" onSubmit={handelSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" onChange={handleChange} />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Register