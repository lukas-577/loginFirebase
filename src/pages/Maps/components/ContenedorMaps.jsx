import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function ContenedorMaps() {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">

            </TileLayer>
        </MapContainer>
    )
}

export default ContenedorMaps