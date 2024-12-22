import { useState, useEffect } from 'react';


function ImgProfile({ user }) {
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        const loadProfileImage = async () => {
            try {
                // Simula la carga de la imagen desde Firebase
                const imageUrl = await user.photoURL;
                setPhotoURL(imageUrl || "/planta.svg)");
            } catch (error) {
                console.warn('Error al cargar la imagen:', error);
                setPhotoURL("/planta.svg)");
            }
        };

        loadProfileImage();
    }, [user.uid]);


    return (
        <div>
            <img
                className="rounded-full h-20 w-20"
                src={photoURL}
                alt={user.displayName}
                onError={(e) => (e.target.src = "/planta.svg)")} // Imagen por defecto si falla la carga
            />
        </div>
    );
}

export default ImgProfile;
