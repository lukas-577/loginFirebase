import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';

function PhotoReviewPage() {
    const { user } = useAuth();
    const { photos, setPhotos, setCurrentPhotoIndex } = usePhoto(); // Añadimos setPhotos y setCurrentPhotoIndex para resetear las fotos
    const navigate = useNavigate();

    const confirmPhotos = () => {
        alert('Aquí hace la logica la IA');
    };

    const retakeAllPhotos = () => {
        setPhotos([null, null, null]); // Resetea las fotos
        setCurrentPhotoIndex(0); // Resetea el índice para comenzar desde la primera foto
        navigate('/camera'); // Redirige a la página de la cámara
    };

    return (
        <div className="flex flex-col items-center">
            {user && (
                <div className='z-50 fixed w-full bg-base-100'>
                    <NavBar user={user}></NavBar>
                </div>
            )}

            <h1 className="text-2xl mb-4">Revisión de fotos</h1>
            <div className="grid grid-cols-1 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img src={photo} alt={`Foto ${index + 1}`} className="w-full max-w-md mb-2" />
                    </div>
                ))}
            </div>
            <div className="flex space-x-4 mt-4">
                <button 
                    onClick={confirmPhotos} 
                    className="bg-green-500 text-white p-3 rounded-lg shadow-lg"
                >
                    Confirmar Fotos
                </button>
                <button 
                    onClick={retakeAllPhotos} 
                    className="bg-red-500 text-white p-3 rounded-lg shadow-lg"
                >
                    Volver a tomar todas las fotos
                </button>
            </div>
        </div>
    );
}

export default PhotoReviewPage;
