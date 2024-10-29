import React from "react";
import 'boxicons';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';

const GuardaMiUbicacion = ({ position }) => {
    const { user } = useAuth(); // Obtiene el usuario autenticado desde el contexto
    const db = getFirestore(); // Inicializa Firestore

    const addLocation = async () => {
        if (!position) return;

        if (!user) {
            console.error("No hay un usuario autenticado.");
            return;
        }

        // Crea el objeto de ubicación
        const location = {
            lat: position.lat,
            lng: position.lng,
            date: new Date().toLocaleString()
        };

        // Genera un ID basado en las coordenadas
        const locationId = `${position.lat}-${position.lng}`; // ID personalizado

        try {
            // Obtén la referencia de la subcolección 'locations' y define el ID del documento
            const userDocRef = doc(db, 'users', user.uid); // Referencia al documento del usuario
            const locationDocRef = doc(userDocRef, 'locations', locationId); // Referencia al documento dentro de la subcolección 'locations' con ID personalizado

            // Guarda la ubicación en Firestore con el ID personalizado
            await setDoc(locationDocRef, location);
            console.log("Ubicación guardada exitosamente:", location);
        } catch (error) {
            console.error("Error al guardar la ubicación:", error);
        }
    };

    return (
        <div className="absolute bottom-36 right-4 z-50">
            <button className="btn btn-success" onClick={addLocation}>
                <box-icon name='heart'></box-icon>Agregar
            </button>
        </div>
    );
};

export default GuardaMiUbicacion;
