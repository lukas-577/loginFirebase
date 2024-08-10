import React, { createContext, useState, useContext } from 'react';

const PhotoContext = createContext();

export const usePhoto = () => useContext(PhotoContext);

export const PhotoProvider = ({ children }) => {
    const [photo, setPhoto] = useState(null);

    return (
        <PhotoContext.Provider value={{ photo, setPhoto }}>
            {children}
        </PhotoContext.Provider>
    );
};
