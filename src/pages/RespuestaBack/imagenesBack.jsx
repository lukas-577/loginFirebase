import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Importa el hook useAuth
import { useLocation, useNavigate } from 'react-router-dom';  // Importa useLocation y useNavigate
import ImageViewer from './components/imageViewer';
import NavBar from '../../components/NavBar';

function ImageGenerated() {
    const { user } = useAuth();  // Obtén el usuario actual
    const location = useLocation();  // Usa useLocation para obtener el estado de la ruta
    const navigate = useNavigate();  // Hook para navegar entre rutas
    const imageUrls = location.state?.imageUrls || [];  // Obtenemos las URLs de las imágenes desde el estado de la ubicación
    const classDetected = location.state?.classDetected || [];

    if (!user) {
        return <div>Por favor, inicia sesión para ver tus imágenes.</div>;
    }

    console.log(classDetected);

    const handleNavigateToPotability = () => {
        navigate('/water-potability', {state: {classDetected: classDetected}}); // Navegar a la página de potabilidad
    };

    return (
        <div className='bg-base-100'>
            {/* Navbar */}
            <div className="z-50 fixed w-full bg-base-100">
                <NavBar user={user}></NavBar>
            </div>

            {/* Contenedor principal con margen superior para evitar que se tape */}
            <div className="mt-20">
                <h1 className="text-xl text-center">Imágenes procesadas</h1>
                
                {/* Pasa las URLs de las imágenes al componente ImageViewer */}
                <ImageViewer imageUrls={imageUrls} />

                {/* Botón para navegar a WaterPotabilityResultPage */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleNavigateToPotability}
                        className="btn btn-primary px-6 py-2 rounded-lg"
                    >
                        Calcular Potabilidad del Agua
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageGenerated;
