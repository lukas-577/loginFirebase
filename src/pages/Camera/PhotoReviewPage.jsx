import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';
import Alert from '../../components/Alert';

function PhotoReviewPage() {
    const { user } = useAuth();
    const { photos, setPhotos, setCurrentPhotoIndex } = usePhoto(); // Añadimos setPhotos y setCurrentPhotoIndex para resetear las fotos
    const navigate = useNavigate();

    // Estado de carga y errores
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrls, setImageUrls] = useState([]); // Almacenará las URLs de las imágenes
    const [alert, setAlert] = useState(null);

    console.log(user?.uid);

    const confirmPhotos = async () => {
        try {
            setLoading(true); // Activamos el estado de carga
            setError(null); // Limpiamos cualquier error previo
            const urls = []; // Array para almacenar las URLs de las imágenes

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
                const response = await fetch(`http://localhost:8080/upload-image/${user.uid}`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    // Almacenamos la URL de la imagen en el array
                    urls.push(data.image_path);
                } else {
                    throw new Error("Error al subir la foto");
                }
            }

            setImageUrls(urls); // Almacenamos las URLs obtenidas
            setAlert({
                type: 'success',
                message: "Fotos confirmadas y enviadas correctamente."
            });
            setTimeout(() => {
                navigate('/image-generada', { state: { imageUrls: urls } }); // Redirige a la página de la imagen generada
            }, 3000);

        } catch (error) {
            setError(error.message); // Si ocurre un error, lo guardamos
            console.error("Error al confirmar las fotos:", error);
            setAlert({
                type: 'error',
                message: error.message
            });
        } finally {
            setLoading(false); // Desactivamos el estado de carga al final
        }
    };

    const retakeAllPhotos = () => {
        setPhotos([null, null, null]); // Resetea las fotos
        setCurrentPhotoIndex(0); // Resetea el índice para comenzar desde la primera foto
        navigate('/camera'); // Redirige a la página de la cámara
    };

    return (
        <div className="flex flex-col items-center bg-base-100">
            {user && (
                <div className='z-50 fixed w-full bg-base-100'>
                    <NavBar user={user}></NavBar>
                </div>
            )}

            <h1 className="text-2xl pt-20  ">Revisión de fotos</h1>
            <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center ${index === 2 ? "md:col-span-2" : ""
                            }`}
                    >
                        <img
                            src={photo}
                            alt={`Foto ${index + 1}`}
                            className="w-full max-w-md mb-2"
                        />
                    </div>
                ))}
            </div>

            {/* Mostrar el estado de carga si está en proceso */}
            {loading && (
                <div className="flex items-center justify-center mt-4">
                    <div className="animate-spin rounded-full border-t-4 border-blue-500 h-10 w-10"></div>
                    <span className="ml-2">Cargando...</span>
                </div>
            )}

            {/* Mostrar el error si ocurre uno */}
            {error && (
                <div className="text-red-500 mt-4">
                    <p>Error: {error}</p>
                </div>
            )}

            {/* Mostrar la alerta si existe */}
            {alert && <Alert type={alert.type} message={alert.message} />}


            {/* Botones para confirmar o retomar las fotos */}

            <div className="flex space-x-4 mt-4">
                <button
                    onClick={confirmPhotos}
                    className="btn btn-success"
                    disabled={loading} // Deshabilitar el botón mientras se está cargando
                >
                    Confirmar Fotos
                </button>
                <button
                    onClick={retakeAllPhotos}
                    className="btn btn-error"
                    disabled={loading} // Deshabilitar el botón mientras se está cargando
                >
                    Volver a tomar todas las fotos
                </button>
            </div>

            {/* Mostrar las imágenes procesadas */}
            {imageUrls.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl">Imágenes procesadas</h2>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {imageUrls.map((imageUrl, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img src={imageUrl} alt={`Imagen procesada ${index + 1}`} className="w-full max-w-md mb-2" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoReviewPage;
