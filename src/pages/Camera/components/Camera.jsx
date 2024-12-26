import React, { useState, useEffect, useRef } from 'react';

function Camera({ onCapture }) {
    const videoRef = useRef(null);
    const [devices, setDevices] = useState([]); // Para almacenar todas las cámaras
    const [deviceId, setDeviceId] = useState(''); // ID de la cámara activa
    const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0); // Índice de la cámara activa

    useEffect(() => {
        // Enumerar los dispositivos de video
        navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
            const videoDevices = mediaDevices.filter(({ kind }) => kind === "videoinput");
            setDevices(videoDevices);
            if (videoDevices.length > 0) {
                setDeviceId(videoDevices[0].deviceId); // Establecer la primera cámara como predeterminada
            }
        });
    }, []);

    useEffect(() => {
        startCamera();
    }, [deviceId]); // Reinicia la cámara cuando cambia el deviceId

    const startCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                // Detener el stream existente
                if (videoRef.current && videoRef.current.srcObject) {
                    const stream = videoRef.current.srcObject;
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                }

                // Iniciar el stream con el deviceId seleccionado
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: deviceId ? { exact: deviceId } : undefined },
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

    const toggleCamera = () => {
        if (devices.length > 1) {
            const nextIndex = (currentDeviceIndex + 1) % devices.length;
            setCurrentDeviceIndex(nextIndex);
            setDeviceId(devices[nextIndex].deviceId);
        }
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

            (
            <button
                onClick={toggleCamera}
                className="bg-gray-500 text-white p-3 rounded-lg shadow-lg mt-4"
            >
                Cambiar Cámara
            </button>
            )

            <p className="text-white mt-2">
                Cámara actual: {devices[currentDeviceIndex]?.label || `Cámara ${currentDeviceIndex + 1}`}
            </p>
        </div>
    );
}

export default Camera;
