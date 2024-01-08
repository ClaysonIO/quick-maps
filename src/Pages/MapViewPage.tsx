import React from 'react';
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import {IAddress, useAddresses} from "../Hooks/useAddresses.ts";
import {Marker} from "react-leaflet";
import L from 'leaflet';
import {useParams} from "react-router";
import {MapIconStatusDialog} from "../Components/MapIconStatusDialog.tsx";

export function MapViewPage() {
    const {groupId} = useParams() as { groupId: string };

    const {addresses, addVisit} = useAddresses(groupId);

    const [selectedAddress, setSelectedAddress] = React.useState<IAddress | null>(null)

    return (
        <>
            <MapContainer
                center={[28.795319, -81.308297]}
                zoom={14}
                scrollWheelZoom={true}
                style={{height: '100%', width: '100%'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {addresses.map((address) => (
                    <Marker

                        key={address._id}
                        position={[address.lat, address.lng]}
                        icon={L.divIcon({className: `my-div-icon ${address.status}`})}
                        eventHandlers={{
                            click: () => {
                                setSelectedAddress(address);
                            }
                        }}
                    />
                ))}

            </MapContainer>

            {selectedAddress && <MapIconStatusDialog
                address={selectedAddress}
                addVisit={addVisit}
                handleClose={() => setSelectedAddress(null)}
            />}
        </>
    )
}

