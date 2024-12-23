import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

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
    const { user } = useAuth();
    const location = useLocation();
    const detectedPlants = location.state?.detectedPlants || [];
    const [manualPlants, setManualPlants] = useState([]);
    const [result, setResult] = useState(null);

    const allPlants = [...detectedPlants, ...manualPlants];

    const handleAddManualPlant = () => {
        setManualPlants((prev) => [...prev, { id: '', cantidad: 0 }]);
    };

    const handleManualPlantChange = (index, field, value) => {
        setManualPlants((prev) => {
            const updated = [...prev];
            updated[index][field] = field === 'cantidad' ? Number(value) : value;
            return updated;
        });
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
            const selectedPlant = plantTypes[plant.id];
            if (selectedPlant) {
                const coverageValue = calculateCoverageValue((plant.cantidad / 3)*100); // Dividimos entre 3
                const Vi = selectedPlant.vi;
                const Vti = selectedPlant.vt;

                numerator += Vi * coverageValue * Vti;
                denominator += Vi * coverageValue;
            }
        });

        const icap = numerator / (denominator || 1);
        setResult(icap.toFixed(2));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
            {user && <NavBar user={user} />}
            <h1 className="text-xl mb-4">Resultados de Potabilidad del Agua</h1>

            <div className="mb-4">
                <h2 className="text-lg font-semibold">Plantas detectadas automáticamente:</h2>
                <ul>
                    {detectedPlants.map((plant, index) => (
                        <li key={index}>
                            {plantTypes[plant.id]?.nombre || plant.id} - Cantidad: {plant.cantidad}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold">Añadir plantas manualmente:</h2>
                {manualPlants.map((plant, index) => (
                    <div key={index} className="flex space-x-4 mt-2">
                        <select
                            value={plant.id}
                            onChange={(e) => handleManualPlantChange(index, 'id', e.target.value)}
                            className="select select-bordered"
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
                            onChange={(e) => handleManualPlantChange(index, 'cantidad', e.target.value)}
                            className="input input-bordered"
                        />
                    </div>
                ))}
                <button
                    onClick={handleAddManualPlant}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Añadir planta manualmente
                </button>
            </div>

            <button
                onClick={calculateICAP}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
                Calcular ICAP
            </button>

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