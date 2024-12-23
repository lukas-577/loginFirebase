import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import bgAfiliacion from '../../assets/bgLogin.svg'; // Asegúrate de tener un SVG como fondo.

const Afiliacion = () => {
  const [organizacion, setOrganizacion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tipo de organización seleccionada:', organizacion);
  };

  const handleAfiliacion = async () => {
    try {
      navigate("/ubicacion");
    } catch (error) {
      console.error(error.message);
    }
  };

  const organizacionOptions = [
    { value: 'ONG', label: 'ONG' },
    { value: 'Empresa', label: 'Empresa' },
    { value: 'Comunidad', label: 'Comunidad' },
    { value: 'Otro', label: 'Otro' },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgAfiliacion})`,
      }}
    >
      {/* Fondo opaco para contraste */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Contenido principal */}
      <div className="relative bg-white/90 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-lg z-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Afiliación
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="organizacion"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Selecciona tu tipo de organización:
            </label>
            <Select
              id="organizacion"
              options={organizacionOptions}
              onChange={(selectedOption) => setOrganizacion(selectedOption.value)}
              placeholder="Seleccionar..."
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

          <div className="text-center">
            <button
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              type="button"
              onClick={handleAfiliacion}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Afiliacion;
