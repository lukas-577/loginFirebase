import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar'

function Login() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navegate = useNavigate()
  const { login, loginWitchGoogle } = useAuth()


  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value
    })
  }


  const handleGoogleSignin = async () => {
    try {
      await loginWitchGoogle()
      navegate("/")
    } catch (error) {
      setError(error.message)
    }

  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    setError("");
    try {
      await login(user.email, user.password);
      navegate('/')
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
      if (error.code === "auth/invalid-credential") {
        setError("credenciales invalidas")
      }
      console.log("error:" + error.message)
    }

  }


  return (
    <>
      <div className="hero h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
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
                <input type="password" name="password" placeholder="password" className="input input-bordered" required onChange={handleChange} />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-500" type="submit">Login</button>

              </div>
              <button className="btn base-300" onClick={handleGoogleSignin}>Login Google</button>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login