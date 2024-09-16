import React, { useState, useEffect } from "react";

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

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Agregar
            </button>
        </div>
    )
}

export default GuardaMiUbicacion;