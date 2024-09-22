import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Importar Firestore
import { getAuth } from 'firebase/auth'; // Importar Auth
import regionsData from './regionsData.json'; // Asegúrate de que este archivo está en la ruta correcta

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
    <div className="flex justify-center items-center h-screen w-screen">
      <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded shadow-md">
        <h2 className="text-center text-2xl mb-4">Selecciona tu ubicación</h2>

        <div className="mb-4">
          <label htmlFor="region" className="block mb-2">Región:</label>
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
                backgroundColor: '#191e24',
                border: '1px solid #333',
                color: '#fff',
                boxShadow: 'none',
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: '#191e24',
                color: '#fff',
                maxHeight: 300,
                overflowY: 'hidden',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#1c2641' : '#191e24',
                color: '#fff',
                cursor: 'pointer',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#888',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#fff',
              }),
            }}
          />
        </div>

        {region && (
          <div className="mb-4">
            <label htmlFor="comuna" className="block mb-2">Comuna:</label>
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
                  backgroundColor: '#191e24',
                  border: '1px solid #333',
                  color: '#fff',
                  boxShadow: 'none',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#191e24',
                  color: '#fff',
                  maxHeight: 250,
                  overflowY: 'auto',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#1c2641' : '#191e24',
                  color: '#fff',
                  cursor: 'pointer',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#888',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#fff',
                }),
              }}
            />
          </div>
        )}

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ubicacion;
