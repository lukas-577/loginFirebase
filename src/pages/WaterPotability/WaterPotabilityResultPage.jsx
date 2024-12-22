import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../context/AuthContext';

const plantTypes = {
    planta1: { nombre: "Agrostis capillaris", vi: 2.5, vt: 8 },
    planta2: { nombre: "Alga filamentosa", vi: 2, vt: 8 },
    planta3: { nombre: "Alisma lanceolatum", vi: 2, vt: 5 },
    planta4: { nombre: "Alnus glutinosa", vi: 2.5, vt: 6 },
    planta5: { nombre: "Blechnum chilense", vi: 2.5, vt: 8 },
    planta6: { nombre: "Chusquea quila", vi: 2.5, vt: 8 },
    planta7: { nombre: "Dactylis glomerata", vi: 2.5, vt: 8 },
    planta8: { nombre: "Eleocharis radicans", vi: 2.5, vt: 8 },
    planta9: { nombre: "Equisetum bogotense", vi: 2.5, vt: 8 },
    planta10: { nombre: "Hydrocotyle sp", vi: 1.5, vt: 4 },
    planta11: { nombre: "Juncus procerus", vi: 2, vt: 8 },
    planta12: { nombre: "Lotus pedunculatus", vi: 2.5, vt: 8 },
    planta13: { nombre: "Plantago lanceolata", vi: 2, vt: 6 },
    planta14: { nombre: "Plantago major", vi: 2, vt: 6 },
    planta15: { nombre: "Polygonum hydropiperoides", vi: 2.5, vt: 7 },
    planta16: { nombre: "Ranunculus repens", vi: 2.1, vt: 8 },
    planta17: { nombre: "Rubus constrictus", vi: 2.5, vt: 8 },
    planta18: { nombre: "Rumex conglomeratus", vi: 1.5, vt: 4 },
    planta19: { nombre: "Salix caprea", vi: 1.5, vt: 8 },
    planta20: { nombre: "Salix viminalis", vi: 1.5, vt: 7 },
    planta21: { nombre: "Taraxacum officinale", vi: 1.5, vt: 6 },
    planta22: { nombre: "Trifolium repens", vi: 2.5, vt: 8 },
    planta23: { nombre: "Veronica anagallis", vi: 1.5, vt: 4 },
    planta24: { nombre: "Nasturtium officinale", vi: 1, vt: 4 },
    planta25: { nombre: "Myriophyllum aquaticum", vi: 1.5, vt: 4 },
    planta26: { nombre: "Ludwigia peploides", vi: 1, vt: 4 },
    planta27: { nombre: "Egeria densa", vi: 1.5, vt: 5 },
};

function WaterPotabilityResultPage() {
    const [plantCount, setPlantCount] = useState(0); // Número de plantas detectadas
    const [plants, setPlants] = useState([]); // Lista dinámica de plantas seleccionadas
    const [result, setResult] = useState(null);

    const { user } = useAuth();

    const handlePlantCountChange = (count) => {
        const parsedCount = Math.max(0, Number(count));
        setPlantCount(parsedCount);

        // Ajusta la lista de plantas según el número ingresado
        setPlants((prev) => {
            const newPlants = [...prev];
            while (newPlants.length < parsedCount) {
                newPlants.push({ id: '', cantidad: 0 });
            }
            return newPlants.slice(0, parsedCount);
        });
    };

    const handlePlantSelection = (index, field, value) => {
        setPlants((prev) => {
            const updatedPlants = [...prev];
            if (field === 'id') {
                updatedPlants[index].id = value;
            } else if (field === 'cantidad') {
                updatedPlants[index].cantidad = Number(value);
            }
            return updatedPlants;
        });
    };

    const calculateCoverageValue = (percentage) => {
        if (percentage < 5) return 1;
        if (percentage >= 5 && percentage < 50) return 2;
        return 3;
    };

    const calculateResult = () => {
        // Calcula el total de plantas
        const totalPlants = plants.reduce((acc, plant) => acc + plant.cantidad, 0);

        let numerator = 0;
        let denominator = 0;

        plants.forEach((plant) => {
            const selectedPlant = plantTypes[plant.id];
            if (selectedPlant) {
                const percentage = (plant.cantidad / totalPlants) * 100;
                const coverageValue = calculateCoverageValue(percentage);

                // Incrementa numerador y denominador
                numerator += selectedPlant.vi * coverageValue * selectedPlant.vt;
                denominator += selectedPlant.vi * coverageValue;
            }
        });

        const icap = numerator / (denominator || 1); // Evita divisiones por 0
        setResult(icap.toFixed(2));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
            {user && (
                <div className="z-50 fixed w-full bg-base-100">
                    <NavBar user={user} />
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Cantidad de plantas detectadas:</label>
                <input
                    type="number"
                    value={plantCount}
                    onChange={(e) => handlePlantCountChange(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            <div className="mb-4">
                {plants.map((plant, index) => (
                    <div key={index} className="mb-2">
                        <label className="block text-gray-700">Planta {index + 1}:</label>
                        <select
                            value={plant.id}
                            onChange={(e) => handlePlantSelection(index, 'id', e.target.value)}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option value="">Selecciona una planta</option>
                            {Object.entries(plantTypes).map(([key, type]) => (
                                <option key={key} value={key}>
                                    {type.nombre}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={plant.cantidad}
                            placeholder="Cantidad"
                            onChange={(e) => handlePlantSelection(index, 'cantidad', e.target.value)}
                            className="input input-bordered w-full max-w-xs mt-2"
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={calculateResult}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
                Calcular
            </button>

            {result !== null && (
                <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold">Resultado (ICAP):</h2>
                    <p className="text-xl font-bold">{result}</p>
                </div>
            )}
        </div>
    );
}

export default WaterPotabilityResultPage;
