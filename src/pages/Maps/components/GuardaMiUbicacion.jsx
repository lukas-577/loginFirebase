import React, { useState } from 'react';
import 'boxicons';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import Modal from 'react-modal';

const GuardaMiUbicacion = ({ position }) => {
    const { user } = useAuth();
    const db = getFirestore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationName, setLocationName] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false); // Estado para manejar la visibilidad gradual

    const addLocation = async () => {
        if (!position) return;

        if (!user) {
            console.error("No hay un usuario autenticado.");
            return;
        }

        const location = {
            nombre: locationName,
            lat: position.lat,
            lng: position.lng,
            date: new Date().toLocaleString()
        };

        const locationId = locationName || `${position.lat}-${position.lng}`;

        try {
            const userDocRef = doc(db, 'users', user.uid);
            const locationsCollectionRef = collection(userDocRef, 'locations');
            const locationDocRef = doc(locationsCollectionRef, locationId);

            await setDoc(locationDocRef, location);
            console.log("Ubicación guardada exitosamente:", location);

            // Mostrar snackbar y luego ocultarlo gradualmente
            setShowSnackbar(true);
            setSnackbarVisible(true);
            setTimeout(() => setSnackbarVisible(false), 2500); // Inicia el desvanecimiento después de 2.5 segundos
            setTimeout(() => setShowSnackbar(false), 3000); // Oculta completamente después de 3 segundos
        } catch (error) {
            console.error("Error al guardar la ubicación:", error);
        }
    };

    const handleAddLocationAndClose = () => {
        addLocation();
        setIsModalOpen(false);
        setLocationName('');
    };

    return (
        <div className="absolute bottom-36 right-4 z-50">
            <button className="btn btn-success" onClick={() => setIsModalOpen(true)}>
                <box-icon name='heart'></box-icon>Agregar
            </button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-lg font-bold mb-4">Ingrese el nombre de la ubicación</h2>
                <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="form-control mb-4 bg-gray-300 rounded-lg placeholder-gray-500 p-2 text-gray-800"
                    placeholder="Nombre de la ubicación"
                />
                <button className="btn btn-primary" onClick={handleAddLocationAndClose}>Agregar</button>
            </Modal>

            {/* Snackbar con desvanecimiento */}
            {showSnackbar && (
                <div
                    className={`fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded shadow-md transition-opacity duration-500 ${
                        snackbarVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    Ubicación guardada exitosamente
                </div>
            )}
        </div>
    );
};

export default GuardaMiUbicacion;
