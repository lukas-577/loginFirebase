import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import Camera from '../Camera/components/Camera';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';
import 'boxicons';
import bgCameraPageLight from '../../assets/bgCameraPageLight.svg';
import bgCameraPageDark from '../../assets/bgCameraPageDark.svg';

function CameraPage() {
    const { user } = useAuth();
    const { photos, setPhotos, currentPhotoIndex, setCurrentPhotoIndex } = usePhoto();
    const navigate = useNavigate();

    const [showCamera, setShowCamera] = useState(false); // Controla si mostrar la cámara
    const [hasCamera, setHasCamera] = useState(true); // Estado para verificar si hay cámara conectada
    const [currentTheme, setCurrentTheme] = useState(
        document.documentElement.getAttribute("data-theme") || "mytheme"
    ); // Detecta el tema actual

    const messages = [
        'La primera fotografía debe ser tomada en la ribera del río en un sector húmedo o poco inundado, con una altura de agua inferior a 10 cm (h < 10 cm). Si no hay presencia de plantas presionar “siguiente”.',
        'La segunda fotografía debe ser tomada en la ribera del río en un sector poco inundado, con una altura de agua que no supere los 50 cm (h < 50 cm). Si no hay presencia de plantas presionar “siguiente”.',
        'La tercera fotografía debe ser tomada dentro del río en un dónde la altura de agua sea mayor a 50 cm (h > 50 cm). Si no hay presencia de plantas presionar “siguiente”.'
    ];

    useEffect(() => {
        // Verifica si hay una cámara conectada
        const checkCamera = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                if (videoDevices.length === 0) {
                    setHasCamera(false); // No hay cámara conectada
                }
            } catch (error) {
                console.error('Error verificando la cámara:', error);
                setHasCamera(false); // Maneja el error si no se puede acceder a los dispositivos
            }
        };

        checkCamera();

        // Observa cambios en el tema
        const observer = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute("data-theme");
            setCurrentTheme(theme || "mytheme");
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const handleCapture = (imageSrc) => {
        const newPhotos = [...photos];
        newPhotos[currentPhotoIndex] = imageSrc; // Guarda la foto actual
        setPhotos(newPhotos);

        if (currentPhotoIndex < 2) {
            setCurrentPhotoIndex(currentPhotoIndex + 1); // Avanza al siguiente número de foto
            setShowCamera(false); // Oculta la cámara para mostrar el siguiente mensaje
        } else {
            navigate('/review-photo'); // Navega a la página de revisión después de la tercera foto
        }
    };

    const handleShowCamera = () => {
        setShowCamera(true); // Muestra la cámara al hacer clic en "Tomar foto"
    };

    return (
        <>
            {user && (
                <div className="z-50 fixed w-full bg-white shadow-md">
                    <NavBar user={user}></NavBar>
                </div>
            )}

            <div
                className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: `url(${currentTheme === "darktheme" ? bgCameraPageDark : bgCameraPageLight})`
                }}
            >
                {/* Contenido principal */}
                {!hasCamera ? (
                    <div className="flex flex-col items-center text-center text-red-600">
                        <box-icon name="camera-off" size="lg" animation="tada"></box-icon>
                        <p className="text-lg mt-4">
                            No se detectó ninguna cámara conectada. Conecta una cámara para tomar fotos.
                        </p>
                    </div>
                ) : !showCamera ? (
                    <div className="flex flex-col items-center text-center">
                        {/* Recuerdo estilizado */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 max-w-lg text-center">
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                {messages[currentPhotoIndex]}
                            </h1>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleShowCamera}
                                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center"
                                >
                                    <box-icon name="camera" color="white"></box-icon>
                                    <span className="ml-2">Tomar Foto {currentPhotoIndex + 1}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-md">
                        <Camera onCapture={handleCapture} />
                    </div>
                )}
            </div>
        </>
    );
}

export default CameraPage;
