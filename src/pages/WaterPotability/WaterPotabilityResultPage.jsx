import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

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
    "Veronica anagallis": { vi: 1.5, vt: 4, name: "Veronica_anagallis" },
    "Nasturtium officinale": { vi: 1, vt: 4, name: "Nasturtium_officinale" },
    "Myriophyllum aquaticum": { vi: 1.5, vt: 4, name: "Myriophyllum aquaticum" },
    "Ludwigia_peploides": { vi: 1, vt: 4, name: "Ludwigia_peploides" },
    "Egeria densa": { vi: 1.5, vt: 5, name: "Egeria_densa" },
};

function WaterPotabilityResultPage() {
    const { user } = useAuth();
    const location = useLocation();
    const classDetected = location.state?.classDetected || [];
    const [groupedPlants, setGroupedPlants] = useState({});
    const [manualPlants, setManualPlants] = useState([]);
    const [result, setResult] = useState(null);

    // Normalizar los nombres detectados automáticamente
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
        setGroupedPlants(grouped);
    }, [classDetected]);

    // Combinar plantas detectadas automáticamente con las manuales
    const allPlants = [
        ...Object.entries(groupedPlants).map(([name, cantidad]) => ({ name, cantidad })),
        ...manualPlants,
    ];

    const handleAddManualPlant = () => {
        setManualPlants((prev) => [...prev, { name: '', cantidad: '' }]);
    };

    const handleManualPlantChange = (index, field, value) => {
        setManualPlants((prev) => {
            const updated = [...prev];
            if (field === 'cantidad') {
                const numericValue = Number(value);
                // Validar que la cantidad sea mayor que 0
                if (numericValue > 0) {
                    updated[index][field] = numericValue;
                } else {
                    updated[index][field] = ""; // Vaciar el campo si no cumple la validación
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
        } else {
            setResult("Error: Datos insuficientes");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
            {user && <NavBar user={user} />}
            <h1 className="text-xl mb-4">Resultados de Potabilidad del Agua</h1>

            {/* Plantas detectadas automáticamente */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Plantas detectadas automáticamente:</h2>
                <ul>
                    {Object.entries(groupedPlants).map(([name, cantidad], index) => (
                        <li key={index}>
                            {name}: {cantidad}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Añadir plantas manualmente */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Añadir plantas manualmente:</h2>
                {manualPlants.map((plant, index) => (
                    <div key={index} className="flex space-x-4 mt-2 items-center">
                        <select
                            value={plant.name}
                            onChange={(e) => handleManualPlantChange(index, 'name', e.target.value)}
                            className="select select-bordered"
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
                <button
                    onClick={handleAddManualPlant}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Añadir planta manualmente
                </button>
            </div>

            {/* Botón para calcular ICAP */}
            <button
                onClick={calculateICAP}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4"
            >
                Calcular ICAP
            </button>

            {/* Mostrar resultado */}
            {result && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Resultado (ICAP):</h2>
                    <p className="text-xl font-bold">{result}</p>
                </div>
            )}
        </div>
    );
}

export default WaterPotabilityResultPage;
