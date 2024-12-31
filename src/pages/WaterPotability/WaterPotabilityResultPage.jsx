import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import bgCameraPageLight from '../../assets/bgCameraPageLight.svg';
import bgCameraPageDark from '../../assets/bgCameraPageDark.svg';
import { query, orderBy, limit, getFirestore, doc, collection, setDoc, getDocs, updateDoc } from 'firebase/firestore';

const db = getFirestore();

const plantTypes = {
    "Agrostis capillaris": { vi: 2.5, vt: 8, name: "A_capillaris" },
    "Alga filamentosa": { vi: 2, vt: 8 },
    "Alisma lanceolatum": { vi: 2, vt: 5 },
    "Alnus glutinosa": { vi: 2.5, vt: 6 },
    "Blechnum chilense": { vi: 2.5, vt: 8 },
    "Chusquea quila": { vi: 2.5, vt: 8 },
    "Dactylis glomerata": { vi: 2.5, vt: 8 },
    "Eleocharis radicans": { vi: 2.5, vt: 8 },
    "Equisetum bogotense": { vi: 2.5, vt: 8 },
    "Hydrocotyle sp": { vi: 1.5, vt: 4 },
    "Juncus procerus": { vi: 2, vt: 8 },
    "Lotus pedunculatus": { vi: 2.5, vt: 8 },
    "Plantago lanceolata": { vi: 2, vt: 6 },
    "Plantago major": { vi: 2, vt: 6 },
    "Polygonum hydropiperoides": { vi: 2.5, vt: 7 },
    "Ranunculus repens": { vi: 2.1, vt: 8 },
    "Rubus constrictus": { vi: 2.5, vt: 8 },
    "Rumex conglomeratus": { vi: 1.5, vt: 4 },
    "Salix caprea": { vi: 1.5, vt: 8 },
    "Salix viminalis": { vi: 1.5, vt: 7 },
    "Taraxacum officinale": { vi: 1.5, vt: 6 },
    "Trifolium repens": { vi: 2.5, vt: 8 },
    "Veronica anagallis": { vi: 1.5, vt: 4, name: "Veronica_Anagallis_aquaticum" },
    "Nasturtium officinale": { vi: 1, vt: 4, name: "Nasturtium_officinale" },
    "Myriophyllum aquaticum": { vi: 1.5, vt: 4, name: "Myriophyllum_aquaticum" },
    "Ludwigia peploides": { vi: 1, vt: 4, name: "Ludwigia_peploides" },
    "Egeria densa": { vi: 1.5, vt: 5, name: "Egeria_densa" },
};

function WaterPotabilityResultPage() {
    const { user } = useAuth();
    const location = useLocation();
    const classDetected = location.state?.classDetected || [];
    const [allPlants, setAllPlants] = useState([]);
    const [groupedPlants, setGroupedPlants] = useState({});
    const [manualPlants, setManualPlants] = useState([]);
    const [result, setResult] = useState(null);

    const [currentTheme, setCurrentTheme] = useState(
        document.documentElement.getAttribute("data-theme") || "mytheme"
    );

    useEffect(() => {
        const grouped = classDetected.reduce((acc, detectedName) => {
            const fullName = Object.keys(plantTypes).find(
                (key) => plantTypes[key].name === detectedName
            );
            if (fullName) {
                acc[fullName] = (acc[fullName] || 0) + 1;
            }
            return acc;
        }, {});

        const updatedPlants = [
            ...Object.entries(groupedPlants).map(([name, cantidad]) => ({ name, cantidad })),
            ...manualPlants,
        ];
        setAllPlants(updatedPlants);

        setGroupedPlants(grouped);

        const observer = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute("data-theme");
            setCurrentTheme(theme || "mytheme");
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, [manualPlants]);

    const removePlant = (plantName) => {

        setAllPlants((prevPlants) => prevPlants.filter((plant) => plant.name !== plantName));
        setGroupedPlants((prev) => {
            const updatedGroupedPlants = { ...prev };
            delete updatedGroupedPlants[plantName];
            return updatedGroupedPlants;
        });
    };


    const handleAddManualPlant = () => {
        setManualPlants((prev) => [...prev, { name: '', cantidad: '' }]);
    };

    const handleManualPlantChange = (index, field, value) => {
        setManualPlants((prev) => {
            const updated = [...prev];
            if (field === 'cantidad') {
                const numericValue = Number(value);
                if (numericValue > 0) {
                    updated[index][field] = numericValue;
                } else {
                    updated[index][field] = "";
                }
            } else {
                updated[index][field] = value;
            }
            return updated;
        });
    };

    const handleRemoveManualPlant = (index) => {
        setManualPlants((prev) => prev.filter((_, i) => i !== index));
    };

    const calculateCoverageValue = (quantity) => {
        if (quantity < 5) return 1;
        if (quantity >= 5 && quantity < 50) return 2;
        return 3;
    };

    const calculateICAP = () => {
        let numerator = 0;
        let denominator = 0;

        allPlants.forEach((plant) => {
            const selectedPlant = plantTypes[plant.name];
            console.log("selectedPlant", selectedPlant);
            if (selectedPlant) {
                const coverageValue = calculateCoverageValue((plant.cantidad / 3) * 100);
                const Vi = selectedPlant.vi;
                const Vti = selectedPlant.vt;

                if (!isNaN(Vi) && !isNaN(Vti) && !isNaN(coverageValue)) {
                    numerator += Vi * coverageValue * Vti;
                    denominator += Vi * coverageValue;
                }
            }
        });

        if (denominator > 0) {
            const icap = numerator / denominator;
            setResult(icap.toFixed(2));
            saveResultToFirestore(icap.toFixed(2));
        } else {
            setResult("Error: Datos insuficientes");
        }
    };
    const saveResultToFirestore = async (icapResult) => {
        if (!user) {
            console.error("Usuario no autenticado");
            return;
        }

        const resultData = {
            icap: icapResult,
            plants: allPlants,
            date: new Date().toISOString(),
        };

        try {
            // Referencia a la colección 'locations' del usuario
            const userDocRef = doc(db, 'users', user.uid);
            const locationsCollectionRef = collection(userDocRef, 'locations');

            // Consulta para obtener el último documento agregado basado en 'date'
            const locationsQuery = query(locationsCollectionRef, orderBy('date', 'desc'), limit(1));
            const querySnapshot = await getDocs(locationsQuery);

            if (querySnapshot.empty) {
                console.error("No se encontraron estaciones en la colección 'locations'.");
                return;
            }

            // Obtener el ID del último documento (última estación)
            const lastLocationDoc = querySnapshot.docs[0];
            const lastLocationId = lastLocationDoc.id;

            console.log("Última estación encontrada con ID:", lastLocationId);

            // Actualizar el documento de la estación con el resultado ICAP
            const locationDocRef = doc(locationsCollectionRef, lastLocationId);
            await updateDoc(locationDocRef, {
                icap: icapResult, // Agregar el campo ICAP
            });

            console.log("Resultado ICAP guardado exitosamente dentro de la estación:", lastLocationId);
        } catch (error) {
            console.error("Error al guardar el resultado ICAP en Firestore:", error);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${currentTheme === "darktheme" ? bgCameraPageDark : bgCameraPageLight})`,
            }}
        >
            {user && <NavBar user={user} />}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 w-11/12 max-w-4xl">
                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Resultados de Potabilidad del Agua
                </h1>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Plantas detectadas automáticamente:</h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
                        {Object.entries(groupedPlants).map(([name, cantidad], index) => (
                            <li key={index} className="flex items-center space-x-4 my-2">
                                <span>{name}: {cantidad}</span>
                                <button
                                    onClick={() => removePlant(name)}
                                    className="btn btn-error px-4 py-2 rounded-lg"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Añadir plantas manualmente:</h2>
                    <button
                        onClick={handleAddManualPlant}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                    >
                        Añadir planta
                    </button>
                    {manualPlants.map((plant, index) => (
                        <div key={index} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-2 items-center">
                            <select
                                value={plant.name}
                                onChange={(e) => handleManualPlantChange(index, 'name', e.target.value)}
                                className="select select-bordered mt-2"
                            >
                                <option value="">Selecciona una planta</option>
                                {Object.keys(plantTypes).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={plant.cantidad}
                                placeholder="Cantidad"
                                onChange={(e) => handleManualPlantChange(index, 'cantidad', e.target.value)}
                                className="input input-bordered"
                            />
                            <button
                                onClick={() => handleRemoveManualPlant(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}

                </div>

                <div className="text-center">
                    <button
                        onClick={calculateICAP}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg "
                    >
                        Calcular ICAP
                    </button>
                </div>

                {result && (
                    <div className="mt-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Resultado (ICAP):</h2>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-200">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WaterPotabilityResultPage;
