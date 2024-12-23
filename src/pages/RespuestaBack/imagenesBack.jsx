import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';  // Importa useNavigate
import ImageViewer from './components/imageViewer';
import NavBar from '../../components/NavBar';

function ImageGenerated() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();  // Instancia de useNavigate
    const imageUrls = location.state?.imageUrls || [];

    // Simulación de JSON con plantas detectadas automáticamente
    const detectedPlants = [
        { id: 'planta1', cantidad: 10 },
        { id: 'planta26', cantidad: 5 },
    ];

    const handleNavigate = () => {
        navigate('/water-potability', { state: { detectedPlants } });
    };

    if (!user) {
        return <div>Por favor, inicia sesión para ver tus imágenes.</div>;
    }

    return (
        <div className='bg-base-100'>
            <div className="z-50 fixed w-full bg-base-100">
                <NavBar user={user}></NavBar>
            </div>

            <div className="mt-20">
                <h1 className="text-xl text-center">Imagenes procesadas</h1>
                <ImageViewer imageUrls={imageUrls} />

                {/* Botón para navegar a la página de Potabilidad */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleNavigate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Ver Potabilidad del Agua
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageGenerated;
