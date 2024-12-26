import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageViewer from './components/imageViewer';
import NavBar from '../../components/NavBar';
import bgProfileLight from '../../assets/bgProfilePageLight.svg';
import bgProfileDark from '../../assets/bgProfilePageDark.svg';

function ImageGenerated() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const imageUrls = location.state?.imageUrls || [];
    const classDetected = location.state?.classDetected || [];
    const [currentTheme, setCurrentTheme] = useState(
        document.documentElement.getAttribute("data-theme") || "mytheme"
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute("data-theme");
            setCurrentTheme(theme || "mytheme");
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 max-w-md">
                    <h2 className="text-lg text-gray-800 dark:text-gray-100 text-center">
                        Por favor, inicia sesión para ver tus imágenes.
                    </h2>
                </div>
            </div>
        );
    }

    const handleNavigateToPotability = () => {
        navigate('/water-potability', { state: { classDetected: classDetected } });
    };

    return (
        <div
            className="bg-base-100 min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${currentTheme === 'darktheme' ? bgProfileDark : bgProfileLight})`,
            }}
        >
            {/* Navbar */}
            <div className="z-50 fixed w-full bg-base-100">
                <NavBar user={user} />
            </div>

            {/* Contenedor principal */}
            <div className="mt-20 p-4">
                {/* Título principal */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 max-w-4xl mx-auto text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Imágenes procesadas
                    </h1>
                </div>

                {/* Visualización de imágenes */}
                <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
                    <ImageViewer imageUrls={imageUrls} />
                </div>

                {/* Botón para navegar */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleNavigateToPotability}
                        className="btn btn-primary px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                    >
                        Calcular Potabilidad del Agua
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageGenerated;
