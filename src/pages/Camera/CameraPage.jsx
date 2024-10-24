import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import Camera from '../Camera/components/Camera';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';
import 'boxicons';

function CameraPage() {
    const { user } = useAuth();
    const { photos, setPhotos, currentPhotoIndex, setCurrentPhotoIndex } = usePhoto();
    const navigate = useNavigate();

    const [showCamera, setShowCamera] = useState(false); // Controla si mostrar la cámara
    const [hasCamera, setHasCamera] = useState(true); // Estado para verificar si hay cámara conectada

    const messages = [
        'Toma la primera foto: asegúrate de que tu rostro esté visible',
        'Toma la segunda foto: incluye un fondo claro',
        'Toma la tercera foto: intenta que sea un plano cercano'
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
    }, [])

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
                <div className='z-50 fixed w-full bg-base-100'>
                    <NavBar user={user}></NavBar>
                </div>
            )}

            <div className="flex flex-col items-center justify-center h-screen">
                {!hasCamera ? ( // Si no hay cámara, muestra la advertencia
                    <div className="text-red-500 text-lg"><box-icon name='alarm-exclamation' animation='tada' ></box-icon>
                        No se detectó ninguna cámara conectada. Conecta una cámara para tomar fotos.
                    </div>
                ) : !showCamera ? ( // Si la cámara no está visible, muestra el mensaje
                    <div className=''>
                        <h1 className="text-xl text-dark mb-4">{messages[currentPhotoIndex]}</h1>
                        <button
                            onClick={handleShowCamera}
                            className="bg-blue-500 text-white p-4 rounded-lg shadow-lg"
                        >
                            Tomar Foto {currentPhotoIndex + 1}
                        </button>
                    </div>
                ) : (
                    <Camera onCapture={handleCapture} />
                )}
            </div>
        </>
    );
}

export default CameraPage;
