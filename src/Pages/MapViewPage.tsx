import React from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import {Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css'

export function MapViewPage(){

    return (
        <div style={{height: '100vh', width: '100vw'}}>
        <MapContainer center={[28.795319, -81.308297]} zoom={14} scrollWheelZoom={true} style={{height: '100%', width: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

        </MapContainer>
        </div>
    )
}