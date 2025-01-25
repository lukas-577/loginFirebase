import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Importar Firestore
import { getAuth } from 'firebase/auth'; // Importar Auth
import regionsData from './regionsData.json'; // Asegúrate de que este archivo está en la ruta correcta
import bgUbicacion from '../../assets/bgLogin.jpeg'; // Fondo SVG

const Ubicacion = () => {
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const navigate = useNavigate();
  const db = getFirestore(); // Inicializar Firestore
  const auth = getAuth(); // Inicializar Auth

  const handleRegionChange = (selectedOption) => {
    setRegion(selectedOption.value);
    setComuna(''); // Resetea la comuna cuando cambie la región
  };

  const handleComunaChange = (selectedOption) => {
    setComuna(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        // Guardar los datos de región y comuna en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          region,
          comuna,
        }, { merge: true }); // Merge para no sobreescribir datos existentes

        console.log('Datos guardados exitosamente en Firestore.');
        navigate('/', { state: { region, comuna } });
      } catch (error) {
        console.error('Error al guardar los datos:', error);
      }
    } else {
      console.error('No hay usuario autenticado.');
    }
  };

  const regionOptions = Object.keys(regionsData).map((regionName) => ({
    value: regionName,
    label: regionName,
  }));

  const comunaOptions = region
    ? regionsData[region].map((comunaName) => ({
      value: comunaName,
      label: comunaName,
    }))
    : [];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgUbicacion})`,
      }}
    >
      {/* Fondo opaco para contraste */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Contenido principal */}
      <div className="relative bg-white/90 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-lg z-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Selecciona tu ubicación
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="region"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Región:
            </label>
            <Select
              id="region"
              options={regionOptions}
              onChange={handleRegionChange}
              placeholder="Selecciona una región"
              menuPlacement="auto"
              menuShouldScrollIntoView={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#ffffff',
                  border: '1px solid #ddd',
                  color: '#333',
                  boxShadow: 'none',
                  borderRadius: '8px',
                  padding: '4px',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#f9f9f9',
                  color: '#333',
                  maxHeight: 250,
                  overflowY: 'auto',
                  borderRadius: '8px',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#4A90E2' : '#f9f9f9',
                  color: state.isSelected ? '#fff' : '#333',
                  cursor: 'pointer',
                  padding: '10px',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#888',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#333',
                }),
              }}
            />
          </div>

          {region && (
            <div className="mb-6">
              <label
                htmlFor="comuna"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Comuna:
              </label>
              <Select
                id="comuna"
                options={comunaOptions}
                onChange={handleComunaChange}
                placeholder="Selecciona una comuna"
                menuPlacement="auto"
                menuShouldScrollIntoView={false}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: '#ffffff',
                    border: '1px solid #ddd',
                    color: '#333',
                    boxShadow: 'none',
                    borderRadius: '8px',
                    padding: '4px',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: '#f9f9f9',
                    color: '#333',
                    maxHeight: 250,
                    overflowY: 'auto',
                    borderRadius: '8px',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#4A90E2' : '#f9f9f9',
                    color: state.isSelected ? '#fff' : '#333',
                    cursor: 'pointer',
                    padding: '10px',
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#888',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#333',
                  }),
                }}
              />
            </div>
          )}

          <div className="text-center">
            <button
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ubicacion;
