import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Importa el hook useAuth
import { useLocation } from 'react-router-dom';  // Importa el hook useLocation
import ImageViewer from './components/imageViewer';
import NavBar from '../../components/NavBar';

function ImageGenerated() {
    const { user } = useAuth();  // Obtén el usuario actual
    const location = useLocation();  // Usa useLocation para obtener el estado de la ruta
    const imageUrls = location.state?.imageUrls || [];  // Obtenemos las URLs de las imágenes desde el estado de la ubicación

    if (!user) {
        return <div>Por favor, inicia sesión para ver tus imágenes.</div>;
    }

    return (
        <div className='bg-base-100'>
            {/* Navbar */}
            <div className="z-50 fixed w-full bg-base-100">
                <NavBar user={user}></NavBar>
            </div>

            {/* Contenedor principal con margen superior para evitar que se tape */}
            <div className="mt-20">  {/* Ajustamos el margen superior */}
                <h1 className="text-xl text-center">Imagenes procesadas</h1>
                {/* Pasa las URLs de las imágenes al componente ImageViewer */}
                <ImageViewer imageUrls={imageUrls} />
            </div>
        </div>
    );
}

export default ImageGenerated;
