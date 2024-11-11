import React, { useState, useRef, useEffect } from 'react';

function Camera({ onCapture }) {
    const videoRef = useRef(null);
    const [isBackCamera, setIsBackCamera] = useState(false); // Estado para alternar entre cámaras

    useEffect(() => {
        startCamera();
    }, [isBackCamera]); // Se vuelve a ejecutar cuando cambia el estado de la cámara

    const startCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: isBackCamera ? { exact: "environment" } : "user" },
                });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        }
    };

    const takePhoto = () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL("image/png");
        onCapture(imageSrc);
    };

    const switchCamera = () => {
        setIsBackCamera((prev) => !prev); // Cambia entre la cámara frontal y trasera
    };

    return (
        <div className="flex flex-col items-center">
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-md" />
            <button 
                onClick={takePhoto} 
                className="bg-blue-500 text-white p-3 rounded-lg shadow-lg mt-4"
            >
                Tomar Foto
            </button>
            <button 
                onClick={switchCamera} 
                className="bg-gray-500 text-white p-3 rounded-lg shadow-lg mt-4"
            >
                Cambiar a {isBackCamera ? "Cámara Frontal" : "Cámara Trasera"}
            </button>
        </div>
    );
}

export default Camera;
