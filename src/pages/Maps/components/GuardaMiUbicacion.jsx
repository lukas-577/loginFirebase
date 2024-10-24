import React, { useState, useEffect } from "react";
import 'boxicons';

const GuardaMiUbicacion = ({ position }) => {
    const addLocation = () => {

        if (!position) return;

        const location = {
            lat: position.lat,
            lng: position.lng,
            date: new Date().toLocaleString()
        }
        console.log(location)
        const locations = JSON.parse(localStorage.getItem('locations')) || []
        locations.push(location)
        localStorage.setItem('locations', JSON.stringify(locations))
        console.log(locations)
    }

    return (
        <div className="absolute bottom-36 right-4 z-50">
            <button className="btn btn-success" onClick={addLocation}>

                <box-icon name='heart'></box-icon>Agregar
            </button>
        </div>
    )
}

export default GuardaMiUbicacion;