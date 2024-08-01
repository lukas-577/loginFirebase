import React from 'react';
import L from 'leaflet';
import iconLocation from '../../../assets/iconLocation.svg';

export const IconLocation = L.icon({
    iconUrl: iconLocation,
    iconRetinaUrl: iconLocation,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: 'leaflet-venue-icon'
});

export default IconLocation;
