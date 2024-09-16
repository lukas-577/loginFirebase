import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Afiliacion = () => {
  const [organizacion, setOrganizacion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tipo de organización seleccionada:', organizacion);
    // Aquí puedes enviar los datos a Firebase o hacer otra acción.
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
    <div className="flex justify-center items-center h-screen w-screen">
      <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded shadow-md">
        <h2 className="text-center text-2xl mb-4">Afiliación</h2>

        <div className="mb-4">
          <label htmlFor="organizacion" className="block mb-2">Selecciona tu tipo de organización:</label>
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
                color: state.isSelected ? '#fff' : '#fff',
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

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleAfiliacion}
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Afiliacion;
