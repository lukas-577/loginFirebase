import React, { createContext, useContext, useState } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
    const [photos, setPhotos] = useState([null, null, null]); // Ahora tenemos un array de 3 fotos
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Controla cuál foto se está tomando actualmente

    return (
        <PhotoContext.Provider value={{ photos, setPhotos, currentPhotoIndex, setCurrentPhotoIndex }}>
            {children}
        </PhotoContext.Provider>
    );
};

export const usePhoto = () => {
    return useContext(PhotoContext);
};
