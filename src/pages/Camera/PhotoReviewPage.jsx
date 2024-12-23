import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoto } from '../../context/PhotoContext';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';
import Alert from '../../components/Alert';
import bgPhotoReviewLight from '../../assets/bgCameraPageLight.svg';
import bgPhotoReviewDark from '../../assets/bgCameraPageDark.svg';

function PhotoReviewPage() {
    const { user } = useAuth();
    const { photos, setPhotos, setCurrentPhotoIndex } = usePhoto();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [alert, setAlert] = useState(null);

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

    const confirmPhotos = async () => {
        try {
            setLoading(true);
            setError(null);
            const urls = [];

            for (const photo of photos) {
                const base64String = photo.split(",")[1];
                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "image/png" });

                const formData = new FormData();
                formData.append("file", blob, "photo.png");

                const response = await fetch(`http://localhost:8080/upload-image/${user.uid}`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    urls.push(data.image_path);
                } else {
                    throw new Error("Error al subir la foto");
                }
            }

            setImageUrls(urls);
            setAlert({ type: 'success', message: "Fotos confirmadas y enviadas correctamente." });
            setTimeout(() => {
                navigate('/image-generada', { state: { imageUrls: urls } });
            }, 3000);
        } catch (error) {
            setError(error.message);
            setAlert({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const retakeAllPhotos = () => {
        setPhotos([null, null, null]);
        setCurrentPhotoIndex(0);
        navigate('/camera');
    };

    return (
        <div
            className="relative flex flex-col items-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${currentTheme === "darktheme" ? bgPhotoReviewDark : bgPhotoReviewLight})`,
            }}
        >
            {user && (
                <div className="z-50 fixed w-full bg-base-100 shadow-md">
                    <NavBar user={user}></NavBar>
                </div>
            )}

            {/* Título estilizado */}
            <div className="mt-20 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-w-lg text-center">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Revisión de fotos
                </h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 grid-cols-1 p-4">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center ${index === 2 ? "md:col-span-2" : ""}`}
                    >
                        <img
                            src={photo}
                            alt={`Foto ${index + 1}`}
                            className="w-full max-w-md mb-2 shadow-md rounded-lg"
                        />
                    </div>
                ))}
            </div>

            {loading && (
                <div className="flex items-center justify-center mt-4">
                    <div className="animate-spin rounded-full border-t-4 border-blue-500 h-10 w-10"></div>
                    <span className="ml-2">Cargando...</span>
                </div>
            )}

            {error && (
                <div className="text-red-500 mt-4">
                    <p>Error: {error}</p>
                </div>
            )}

            {alert && <Alert type={alert.type} message={alert.message} />}

            <div className="flex space-x-4 mt-4">
                <button
                    onClick={confirmPhotos}
                    className="btn btn-success"
                    disabled={loading}
                >
                    Confirmar Fotos
                </button>
                <button
                    onClick={retakeAllPhotos}
                    className="btn btn-error"
                    disabled={loading}
                >
                    Volver a tomar todas las fotos
                </button>
            </div>

            {imageUrls.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl text-gray-800 dark:text-white">Imágenes procesadas</h2>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {imageUrls.map((imageUrl, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={imageUrl}
                                    alt={`Imagen procesada ${index + 1}`}
                                    className="w-full max-w-md mb-2 shadow-md rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoReviewPage;
