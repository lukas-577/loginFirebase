import React, { useState } from 'react';
import 'boxicons';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen'; // Importa la pantalla de carga

const GuardaMiUbicacion = ({ position }) => {
    const { user } = useAuth();
    const db = getFirestore();
    const navigate = useNavigate();
    const [locationName, setLocationName] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la pantalla de carga

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

        setIsLoading(true); // Mostrar pantalla de carga

        try {
            const userDocRef = doc(db, 'users', user.uid);
            const locationsCollectionRef = collection(userDocRef, 'locations');
            const locationDocRef = doc(locationsCollectionRef, locationId);

            await setDoc(locationDocRef, location);
            console.log("Ubicación guardada exitosamente:", location);

            setShowSnackbar(true);
            setSnackbarVisible(true);

            setTimeout(() => {
                setSnackbarVisible(false);
                setTimeout(() => {
                    setShowSnackbar(false);
                    navigate('/camera');
                    setIsLoading(false); // Ocultar pantalla de carga
                }, 500);
            }, 2500);
        } catch (error) {
            console.error("Error al guardar la ubicación:", error);
        } finally {
            // Ocultar pantalla de carga
        }
    };

    const handleAddLocation = () => {
        addLocation();
        setLocationName('');
    };

    return (
        <>
            {isLoading && <LoadingScreen />} {/* Mostrar la pantalla de carga si está activa */}

            <div className="absolute bottom-4 right-4 z-50">
                <button className="btn btn-success" onClick={() => document.getElementById('my_modal_1').showModal()}>
                    <box-icon name='location-plus'></box-icon>Nueva estación
                </button>

                <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Agregar Ubicación</h3>
                        <p className="py-4">Se agregará la ubicación a tu perfil</p>
                        <input
                            required
                            type="text"
                            placeholder="Nombre de la estación"
                            className="input input-bordered input-success w-full max-w-xs"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => document.getElementById('my_modal_1').close()}
                            >
                                Cancelar
                            </button>
                            <button
                                disabled={!locationName.trim()}
                                className="btn"
                                onClick={() => {
                                    handleAddLocation();
                                    document.getElementById('my_modal_1').close();
                                }}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </dialog>

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
        </>
    );
};

export default GuardaMiUbicacion;
