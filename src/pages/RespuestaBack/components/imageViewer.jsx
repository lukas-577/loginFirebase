import React, { useEffect } from 'react';

function ImageViewer({ imageUrls }) {
    useEffect(() => {
        console.log("Imágenes a mostrar:", imageUrls);
    }, [imageUrls]);

    return (
        <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
            {imageUrls.length > 0 ? (
                imageUrls.map((imageUrl, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center ${index === 2 ? "md:col-span-2" : ""
                            }`}
                    >
                        <img
                            src={imageUrl}
                            alt={`Imagen ${index + 1}`}
                            className="w-full max-w-md mb-2"
                        />
                    </div>
                ))
            ) : (
                <div>No se encontraron imágenes.</div>
            )}
        </div>
    );
}

export default ImageViewer;
