import React, {useEffect, useMemo} from 'react';
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import {useAddresses} from "../Hooks/useAddresses.ts";
import {Marker, useMap} from "react-leaflet";
import L from 'leaflet';
import {useParams} from "react-router";
import {MapIconStatusDialog} from "../Components/MapIconStatusDialog.tsx";
import {IAddress} from "../Interfaces/AddressSchema.ts";
import {useResolutionFilters} from "../Hooks/useResolutionFilters.ts";
import {useMergedAddresses} from "../Hooks/useMergedAddresses.ts";
import {useErrors} from "../Hooks/useErrors.ts";

export function AddressMapPage() {
    const {groupId, projectId} = useParams() as {projectId: string, groupId: string };

    const {data: mergedAddresses, loading} = useMergedAddresses({projectId, geocodeOnly: true})
    const {data: rawAddresses} = useAddresses({projectId, groupId});
    const {filters} = useResolutionFilters();

    const {center, bounds}: {bounds: [[number, number], [number, number]], center: [number, number]} = useMemo(()=>{
        //Get the center of the addresses
        const latitudes = mergedAddresses.map(x=>x.geocode?.latitude).filter(x=>x) as number[];
        const longitudes = mergedAddresses.map(x=>x.geocode?.longitude).filter(x=>x) as number[];
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);

        return {
            center: [(minLat + maxLat) / 2,(minLng + maxLng) / 2],
            bounds: [[minLat, minLng], [maxLat, maxLng]]
    }
    }, [mergedAddresses])

    const [selectedAddress, setSelectedAddress] = React.useState<IAddress | null>(null)

    if(loading || !center[0]) return <div>Loading...</div>

    return (
        <>
            <MapContainer
                center={center}
                zoom={14}
                scrollWheelZoom={true}
                style={{height: '100%', width: '100%'}}
                bounds={bounds}
            >
                <FitBounds bounds={bounds} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mergedAddresses.map((address) => (
                    <Marker

                        key={address.id}
                        position={[address.geocode!.latitude, address.geocode!.longitude]}
                        icon={L.divIcon({className: `my-div-icon ${address.status}`})}
                        eventHandlers={{
                            click: () => {
                                // setSelectedAddress(address);
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

export function FitBounds({bounds}: {bounds: [[number, number], [number, number]]}) {
    const map = useMap();
    useEffect(()=>{
        map.fitBounds(bounds);
    }, [])
    return null;
}