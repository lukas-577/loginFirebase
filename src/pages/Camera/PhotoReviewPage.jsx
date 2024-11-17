import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';

function PhotoReviewPage() {
    const { user } = useAuth();
    const { photos, setPhotos, setCurrentPhotoIndex } = usePhoto(); // Añadimos setPhotos y setCurrentPhotoIndex para resetear las fotos
    const navigate = useNavigate();

    console.log(user.uid)
    const confirmPhotos = async () => {
        try {
            for (const photo of photos) {
                // Extraer solo la parte Base64, quitando el prefijo "data:image/png;base64,"
                const base64String = photo.split(",")[1];

                // Decodificar Base64 y convertirlo en un array de bytes
                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                // Crear un Blob a partir del array de bytes
                const blob = new Blob([byteArray], { type: "image/png" });

                // Crear el FormData y añadir el archivo Blob
                const formData = new FormData();
                formData.append("file", blob, "photo.png"); // 'photo.png' es un nombre temporal

                // Enviar la petición al backend
                const response = await fetch(`https://ia-869766936318.southamerica-west1.run.app/upload-image/${user.uid}`, {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                }
                if (!response.ok) {
                    throw new Error("Error al subir la foto");
                }
            }

            alert("Fotos confirmadas y enviadas correctamente.");
        } catch (error) {
            console.error("Error al confirmar las fotos:", error);
            alert("Hubo un problema al confirmar las fotos.");
        }
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
