import React from 'react'
import { Marker } from 'react-leaflet'
import IconLocation from './IconLocation'

const Markers = ({ position }) => {

    console.log(position)

    return (
        <Marker position={position} icon={IconLocation}></Marker>
    )
}

export default Markers