import React, { useEffect, useState } from "react";
import ContenedorMaps from "./components/ContenedorMaps";


function Maps() {

    const [position, setPosition] = useState({ lat: 0, lng: 0 })
    const [loading, setLoading] = useState(true)

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


    return (
        <>
            <div className="w-full max-w-xs m-auto align-middle">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p className="text-xl mb-4">Maps</p>
                    {!loading && position ? (
                        <ContenedorMaps position={position}></ContenedorMaps>
                    ) : (<p>Cargando!!!</p>)}
                </div>
            </div>
        </>
    )
}

export default Maps