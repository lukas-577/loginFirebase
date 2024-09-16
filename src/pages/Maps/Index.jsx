import React, { useEffect, useRef, useState } from "react";
import ContenedorMaps from "./components/ContenedorMaps";
import FlyToButton from "./components/FlyToButton";
import GuardaMiUbicacion from "./components/GuardaMiUbicacion";


function Maps() {

    const [position, setPosition] = useState({ lat: 0, lng: 0 })
    const [loading, setLoading] = useState(true)
    const mapRef = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
            setLoading(false)
            console.log(position)
        }, (error) => {
            console.log(error)
            setLoading(false)
        },
            { enableHighAccuracy: true }

        )
    }, [])


    const handleFlyTo = () => {
        if (mapRef.current) {
            mapRef.current.flyTo(position, 15); // Centra el mapa en la ubicación actual
        }
        console.log('flyTo')
    };

    return (
        <>
            {!loading && position ? (
                <>
                    <ContenedorMaps position={position} mapRef={mapRef} />
                    <FlyToButton onClick={handleFlyTo} />
                    <GuardaMiUbicacion position={position} />

                </>
            ) : (<p>Cargando!!!</p>)}
        </>
    );
}

export default Maps