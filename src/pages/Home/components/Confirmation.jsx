import React from 'react';
import bgLogin from '../../../assets/bgLogin.svg';
import { useNavigate } from 'react-router-dom';

function Confirmation() {
  const navigate = useNavigate();
  return (
    <div
      className="hero h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="hero-overlay bg-opacity-70 bg-black"></div> {/* Fondo oscuro semitransparente */}
      <div className="hero-content flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
        <div className="max-w-md bg-white/90 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            Correo Enviado
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Hemos enviado un enlace de restablecimiento de contraseña a tu correo electrónico. Por favor, revisa tu bandeja de entrada.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-primary px-6 py-2 rounded-lg shadow hover:shadow-lg transition duration-200"
            >
              Volver a Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
