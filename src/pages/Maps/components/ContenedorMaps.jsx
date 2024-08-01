import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './Markers';

function ContenedorMaps({ position }) {

    console.log(position)

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">

            </TileLayer>
            <Markers></Markers>
        </MapContainer>
    )
}

export default ContenedorMaps