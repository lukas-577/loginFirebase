import React from 'react';

function Confirmation() {
  return (
    <div className="hero h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Correo Enviado</h1>
          <p className="py-6">Hemos enviado un enlace de restablecimiento de contraseña a tu correo electrónico. Por favor, revisa tu bandeja de entrada.</p>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
