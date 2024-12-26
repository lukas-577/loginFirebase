import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import bgLogin from '../../../assets/bgLogin.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { sendPasswordResetEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await sendPasswordResetEmail(email);
      setMessage('Se ha enviado un correo para restablecer tu contraseña.');
      navigate('/confirmation'); // Navegar a la vista de confirmación
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Este correo no está registrado.');
      } else {
        setError('Hubo un error al enviar el correo de restablecimiento.');
        console.error(error);
      }
    }
  };

  return (
    <div className="hero h-screen bg-base-200"
    style={{backgroundImage: `url(${bgLogin})`}}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {error && <div role="alert" className="alert alert-error"><span>{error}</span></div>}
          {message && <div role="alert" className="alert alert-info"><span>{message}</span></div>}
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <h5 className="text-lg text-center font-bold">Restablecer Contraseña</h5>
            </div>
            <div className="form-control mt-5">
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-green-500 text-white hover:bg-green-700" type="submit">Enviar enlace de restablecimiento</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
