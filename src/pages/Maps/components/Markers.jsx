import React from 'react'
import { Marker } from 'react-leaflet'
import IconLocation from './IconLocation'

const Markers = () => {
    return (
        <Marker position={{ lat: 0, lng: 0 }} icon={IconLocation}></Marker>
    )
}

export default Markers