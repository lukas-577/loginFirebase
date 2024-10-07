import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import Camera from '../Camera/components/Camera';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';

function CameraPage() {
    const { user } = useAuth();
    const { photos, setPhotos, currentPhotoIndex, setCurrentPhotoIndex } = usePhoto();
    const navigate = useNavigate();

    const [showCamera, setShowCamera] = useState(false); // Controla si mostrar la cámara

    const messages = [
        'Toma la primera foto: asegúrate de que tu rostro esté visible',
        'Toma la segunda foto: incluye un fondo claro',
        'Toma la tercera foto: intenta que sea un plano cercano'
    ];

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
                {!showCamera ? ( // Si la cámara no está visible, muestra el mensaje
                    <>
                        <h1 className="text-xl text-white mb-4">{messages[currentPhotoIndex]}</h1> {/* Muestra el mensaje correspondiente */}
                        <button 
                            onClick={handleShowCamera} 
                            className="bg-blue-500 text-white p-3 rounded-lg shadow-lg"
                        >
                            Tomar Foto {currentPhotoIndex + 1}
                        </button>
                    </>
                ) : (
                    <Camera onCapture={handleCapture} /> // Muestra la cámara cuando el usuario hace clic en "Tomar Foto"
                )}
            </div>
        </>
    );
}

export default CameraPage;
