import { useState, useEffect } from 'react';

function ImgProfile({ user }) {
    const [photoURL, setPhotoURL] = useState("");
    console.log(user);

    useEffect(() => {
        if (!user || !user.photoURL) {
            setPhotoURL("/planta.svg"); // Imagen predeterminada si no hay usuario o URL de foto
            return;
        }

        const loadProfileImage = async () => {
            try {
                // Carga de la imagen desde la URL proporcionada por el usuario
                const imageUrl = user.photoURL;
                setPhotoURL(imageUrl || "/planta.svg");
            } catch (error) {
                console.warn('Error al cargar la imagen:', error);
                setPhotoURL("/planta.svg"); // Imagen predeterminada si ocurre un error
            }
        };

        loadProfileImage();
    }, [user]);

    return (
        <div>
            <img
                className="rounded-full h-20 w-20"
                src={photoURL}
                alt={user?.displayName || "Perfil"}
                onError={(e) => (e.target.src = "/planta.svg")} // Imagen predeterminada si la carga falla
            />
        </div>
    );
}

export default ImgProfile;

