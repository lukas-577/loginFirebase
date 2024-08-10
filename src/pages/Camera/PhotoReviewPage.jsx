import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';

function PhotoReviewPage() {
    const { photo, setPhoto } = usePhoto();
    const navigate = useNavigate();

    if (!photo) {
        return <div>No photo available</div>;
    }

    const retakePhoto = () => {
        setPhoto(null);
        navigate('/camera');  
    };

    const confirmPhoto = () => {
        alert('Confirmación de la foto');
    };

    return (
        <div>
            <h1>Foto Número 1</h1>
            <img src={photo} alt="Captured" className="w-full max-w-md" />
            <div className="mt-4">
                <button onClick={retakePhoto} className="bg-red-500 text-white p-3 rounded-lg shadow-lg mr-3">
                    Vuelve a tomarla
                </button>
                <button onClick={confirmPhoto} className="bg-green-500 text-white p-3 rounded-lg shadow-lg">
                    Confirmar Foto
                </button>
            </div>
        </div>
    );
}

export default PhotoReviewPage;