import React, {useEffect, useMemo} from 'react';
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import {Marker, useMap} from "react-leaflet";
import L from 'leaflet';
import {useParams} from "react-router";
import {SingleAddressVisitHistoryDialog} from "../Components/SingleAddressVisitHistoryDialog.tsx";
import {useResolutionFilters} from "../Hooks/useResolutionFilters.ts";
import {useMergedAddresses} from "../Hooks/useMergedAddresses.ts";
import {IMergedAddress} from "../Interfaces/MergedAddressSchema.ts";
import {useResolutionTypes} from "../Hooks/useResolutionTypes.ts";
import {NoAddressesDialog} from "../Components/NoAddressesDialog.tsx";
import { CircularProgress } from '@mui/material';

export function MapPage() {
    const {groupId, projectId} = useParams() as { projectId: string, groupId: string };

    const {data: resolutionTypes} = useResolutionTypes({projectId});
    const {data: mergedAddresses, loading} = useMergedAddresses({projectId, geocodeOnly: true})
    const {filters} = useResolutionFilters();

    const {center, bounds}: { bounds: [[number, number], [number, number]], center: [number, number] } = useMemo(() => {
        //Get the center of the addresses
        const latitudes = mergedAddresses.map(x => x.geocode?.latitude).filter(x => x) as number[];
        const longitudes = mergedAddresses.map(x => x.geocode?.longitude).filter(x => x) as number[];

        if (!latitudes.length || !longitudes.length) return {center: [0, 0], bounds: [[0, 0], [0, 0]]}

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);

        return {
            center: [(minLat + maxLat) / 2, (minLng + maxLng) / 2],
            bounds: [[minLat, minLng], [maxLat, maxLng]]
        }
    }, [mergedAddresses])

    const [selectedAddress, setSelectedAddress] = React.useState<IMergedAddress | null>(null)

    const filteredAddresses = useMemo(() => mergedAddresses
        .filter((address) => {
            if (!filters.length || filters.length === resolutionTypes.length) return true;
            return !!address.status && filters.includes(address.status.id)
        }), [filters, mergedAddresses]);

    return (
        <>
            {!loading && !mergedAddresses.length && <NoAddressesDialog/>}
            <MapContainer
                center={center}
                zoom={14}
                scrollWheelZoom={true}
                style={{height: '100%', width: '100%'}}
                bounds={bounds}
            >
                <FitBounds bounds={bounds}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredAddresses.map((address) => (
                    <Marker

                        key={address.id}
                        position={[address.geocode!.latitude, address.geocode!.longitude]}
                        icon={L.divIcon({
                            className: '',
                            html: `<div class="my-div-icon" style="background-color: ${address.status?.color}" />`
                        })}
                        eventHandlers={{
                            click: () => {
                                setSelectedAddress(address);
                            }
                        }}
                    />
                ))}

            </MapContainer>

            {selectedAddress && <SingleAddressVisitHistoryDialog
                projectId={projectId}
                mergedAddress={selectedAddress}
                handleClose={() => setSelectedAddress(null)}
            />}
            {loading && <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000
            }}>
                <CircularProgress size={300}/>
            </div>}
        </>
    )
}

export function FitBounds({bounds}: { bounds: [[number, number], [number, number]] }) {
    const [initialized, setInitialized] = React.useState(false);
    const map = useMap();
    useEffect(() => {
        if (!initialized && bounds[0][0] !== 0) {
            setInitialized(true);
            map.fitBounds(bounds);
            map.flyToBounds(bounds);
        }
    }, [bounds])
    return null;
}