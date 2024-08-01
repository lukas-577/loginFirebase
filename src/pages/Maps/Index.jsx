import React from "react";
import ContenedorMaps from "./components/ContenedorMaps";


function Maps() {
    return (
        <>
            <div className="w-full max-w-xs m-auto align-middle">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p className="text-xl mb-4">Maps</p>
                    <ContenedorMaps></ContenedorMaps>
                </div>
            </div>
        </>
    )
}

export default Maps