import React, { useEffect } from 'react';

function ImageViewer({ imageUrls }) {
    useEffect(() => {
        console.log("Imágenes a mostrar:", imageUrls);
    }, [imageUrls]);

    return (
        <div className="image-container">
            {imageUrls.length > 0 ? (
                imageUrls.map((imageUrl, index) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <img
                            src={imageUrl}
                            alt={`Imagen ${index + 1}`}
                            className="w-full max-w-md"
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
