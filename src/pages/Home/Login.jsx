import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import { FcGoogle } from 'react-icons/fc' 
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

function Login() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navegate = useNavigate()
  const { login, loginWitchGoogle } = useAuth()
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState('password');


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
  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
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
                <h5 className="text-lg text-center font-bold">Inciar Sesión</h5>
              </div>
              <div className="form-control mt-5">
                <input type="email" name="email" placeholder="email" className="input input-bordered" required onChange={handleChange} />
              </div>
              <div className="form-control">
                <div className="relative">
                  <input 
                    type={type} 
                    name="password" 
                    placeholder="password" 
                    className="input input-bordered w-full pr-10" 
                    required onChange={handleChange} 
                  />
                  <button 
                    type="button" 
                    className="absolute right-0 h-10 w-10" 
                    onClick={handleToggle}
                  >
                   <Icon icon={icon} size={18} />
                  </button>
                  <label className="label">
                    <a href="/forgot-password" className="label-text-alt link link-hover">Olvidaste tu contraseña?</a>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-500 text-white hover:bg-green-700 hover:text-white" type="submit">Login</button>
              </div>
              <button className="btn base-300" onClick={handleGoogleSignin}>
                <FcGoogle size={24} />
                <span className="ml-2">Login Google</span>
              </button>
              <div className="text-center mt-3">
              <span cla ssName="label">
                <a href="/register" className="link link-hover">Crear cuenta</a>
              </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login