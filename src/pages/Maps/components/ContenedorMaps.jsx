import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './Markers';

function ContenedorMaps({ position, mapRef }) {

    console.log(position)
    console.log(mapRef)

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%', zIndex: '0' }} ref={mapRef}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">

            </TileLayer>
            <Markers position={position}></Markers>
        </MapContainer>
    )
}

export default ContenedorMaps