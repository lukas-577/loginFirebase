import React, { createContext, useContext, useState } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
    const [photo, setPhoto] = useState(null);
    
    return (
        <PhotoContext.Provider value={{ photo, setPhoto }}>
            {children}
        </PhotoContext.Provider>
    );
};

export const usePhoto = () => {
    return useContext(PhotoContext);
};
