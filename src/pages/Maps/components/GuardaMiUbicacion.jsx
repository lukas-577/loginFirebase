import React, { useState } from 'react';
import 'boxicons';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GuardaMiUbicacion = ({ position }) => {
    const { user } = useAuth();
    const db = getFirestore();
    const navigate = useNavigate();
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
            // Ocultar snackbar gradualmente y redirigir
            setTimeout(() => {
                setSnackbarVisible(false);
                setTimeout(() => {
                    setShowSnackbar(false);
                    navigate('/camera'); // Redirige a la página deseada
                }, 500); // Espera que el snackbar desaparezca visualmente
            }, 2500);
        } catch (error) {
            console.error("Error al guardar la ubicación:", error);
        }
    };

    const handleAddLocation = () => {

        // Aquí va la lógica para agregar la ubicación
        console.log("Ubicación agregada:", locationName);
        addLocation();
        setLocationName('');
    };

    return (
        <div className="absolute bottom-4 right-4 z-50">
            <button className="btn btn-success" onClick={() => document.getElementById('my_modal_1').showModal()}>
                <box-icon name='location-plus'></box-icon>Nueva estación
            </button>

            <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Agregar Ubicación</h3>
                    <p className="py-4">Se agregara la ubicación a tu perfil</p>
                    <input
                        required
                        type="text"
                        placeholder="Nombre de la ubicación"
                        className="input input-bordered input-success w-full max-w-xs"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                    />
                    <div className="modal-action">
                        <button className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Cancelar</button>
                        {/* if there is a button in form, it will close the modal */}
                        <button disabled={!locationName.trim()} className="btn" onClick={() => { handleAddLocation(); document.getElementById('my_modal_1').close() }}>Agregar</button>

                    </div>
                </div>
            </dialog>


            {/* Snackbar con desvanecimiento */}
            {showSnackbar && (
                <div
                    className={`fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded shadow-md transition-opacity duration-500 ${snackbarVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    Ubicación guardada exitosamente
                </div>
            )}
        </div>
    );
};

export default GuardaMiUbicacion;
