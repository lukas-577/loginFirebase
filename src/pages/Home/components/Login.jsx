import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useAuth } from '../../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Importa la configuración de Firestore
import bgLogin from '../../../assets/bgLogin.jpeg'; // Asegúrate de tener un SVG para usar como fondo.

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginWitchGoogle } = useAuth();
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState('password');

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value
    }); 
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await loginWitchGoogle();
      const user = result.user;
      const userDoc = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (!userData.region || !userData.comuna) {
          navigate('/afiliacion');
        } else {
          navigate('/', { state: { region: userData.region, comuna: userData.comuna } });
        }
      } else {
        navigate('/afiliacion');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(user.email, user.password);
      navigate('/');
    } catch (error) {
      if (error.code === "auth/invalid-email") setError("Correo inválido");
      if (error.code === "auth/missing-password") setError("No ingresó el password");
      if (error.code === "auth/weak-password") setError("La password debe tener más de 6 caracteres");
      if (error.code === "auth/email-already-in-use") setError("El usuario ya está registrado");
      if (error.code === "auth/invalid-credential") setError("Credenciales inválidas");
      console.log("error:", error.message);
    }
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  return (
    <>
      <div
        className="relative hero h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgLogin})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div> {/* Fondo oscuro translúcido */}
        <div className="hero-content flex-col lg:flex-row-reverse z-10">
          <div className="text-left lg:text-left">
            <h1 className="text-5xl font-bold text-white">ICAP</h1>
            <p className="py-6 text-gray-200">
              Esta aplicación ha sido desarrollada con el objetivo de facilitar el
              monitoreo de la calidad del agua de la cuenca del río Rahue, Osorno,
              Chile (40°34’40’’S; 73°07’05’’O)...
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white/80 backdrop-blur-lg z-10">
            {error && (
              <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            <form className="card-body" onSubmit={handelSubmit}>
              <div className="form-control">
                <h5 className="text-lg text-center font-bold">Iniciar Sesión</h5>
              </div>
              <div className="form-control mt-5">
                <input type="email" name="email" placeholder="Correo electrónico" className="input input-bordered" required onChange={handleChange} />
              </div>
              <div className="form-control">
                <div className="relative">
                  <input
                    type={type}
                    name="password"
                    placeholder="Contraseña"
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
                    <a href="/forgot-password" className="label-text-alt link link-hover">¿Olvidaste tu contraseña?</a>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-green-500 text-white hover:bg-green-700 hover:text-white" type="submit">Login</button>
              </div>
              <button className="btn base-300" onClick={handleGoogleSignin}>
                <FcGoogle size={24} />
                <span className="ml-2">Login con Google</span>
              </button>
              <div className="text-center mt-3">
                <span className="label">
                  <a href="/register" className="link link-hover">Crear cuenta</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
