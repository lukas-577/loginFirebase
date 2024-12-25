import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import bgLogin from '../../../assets/bgLogin.svg';

function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(user.email, user.password);
            navigate('/afiliacion');
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setError('Correo inválido');
            }
            if (error.code === 'auth/missing-password') {
                setError('No ingresó el password');
            }
            if (error.code === 'auth/weak-password') {
                setError('La contraseña debe tener más de 6 caracteres');
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('El usuario ya está registrado');
            }
            console.log('Error:', error.message);
        }
    };

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <>
            <div
                className="hero min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bgLogin})`,
                }}
            >
                {/* Fondo opaco */}
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="hero-content flex-col lg:flex-row-reverse z-10">
                    {/* Información de la aplicación */}
                    <div className="card flex-1 max-w-lg w-full shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            Bienvenido a ICAP
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            ICAP es una aplicación web que te permite llevar un control eficiente de tus plantas acuáticas y su entorno. ¡Regístrate ahora para comenzar!
                        </p>
                    </div>

                    {/* Formulario de registro */}
                    <div className="card shrink-0 w-full max-w-md shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6">
                        {error && (
                            <div
                                role="alert"
                                className="alert alert-error mb-4 flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="ml-2">{error}</span>
                            </div>
                        )}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700 dark:text-gray-300">
                                        Email
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    className="input input-bordered"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700 dark:text-gray-300">
                                        Contraseña
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    className="input input-bordered"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn bg-green-600 hover:bg-green-700 text-white "
                                    type="submit"
                                >
                                    Registrar
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="button"
                                    className="btn bg-red-600 hover:bg-red-700 text-white"
                                    onClick={handleBack}
                                >
                                    Volver
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
