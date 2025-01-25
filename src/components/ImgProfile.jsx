import { useState, useEffect } from 'react';

function ImgProfile({ user }) {
    const [photoURL, setPhotoURL] = useState("/userIcon.png"); // Imagen predeterminada desde el principio

    useEffect(() => {
        if (user?.photoURL) {
            setPhotoURL(user.photoURL); // Si existe la URL de la foto, se actualiza el estado
        } else {
            setPhotoURL("/userIcon.png"); // Si no existe la URL de la foto, se usa la imagen predeterminada
        }
    }, [user?.photoURL]); // Solo se ejecuta cuando `user` cambia
    //console.log(user?.photoURL);

    return (
        <div>
            <img
                className="rounded-full h-20 w-20"
                src={photoURL}
                alt={user?.displayName || "Perfil"}
                onError={(e) => (e.target.src = "/userIcon.png")} // Imagen predeterminada si la carga falla
            />
        </div>
    );
}

export default ImgProfile;


