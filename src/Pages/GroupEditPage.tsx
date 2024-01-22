import React, {useState} from 'react';
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import { useAddresses} from "../Hooks/useAddresses.ts";
import {Marker} from "react-leaflet";
import L from 'leaflet';
import {
    Autocomplete,
    Box,
    Button,
    Paper,
    TextField
} from "@mui/material";
import {useGroups} from "../Hooks/useGroups.ts";
import {IAddress} from "../Interfaces/AddressSchema.ts";
import {useParams} from "react-router";

export function GroupEditPage() {
    const {projectId} = useParams() as {projectId: string};

    const [selected, setSelected] = useState<string[]>([])

    function whichIcon(address: IAddress) {
        if(selected.indexOf(address._id) !== -1){
            return L.divIcon({className: `my-div-icon selected ${address.groupId ? 'group-' + address.groupId : ''}`})
        }
        if(address.groupId){
            return L.divIcon({className: `my-div-icon group-${address.groupId}`})
        }
        return L.divIcon({className: 'my-div-icon pending'})
    }

    const {data: addresses, updateAll: setAddresses} = useAddresses({projectId});
    const {groups} = useGroups();

    function setAddressGroups(groupId: string){
        const selectedAddresses = addresses.map(x => {

            if (selected.indexOf(x._id) !== -1) {
                return {...x, groupId}
            }
            return x;
        });
        setSelected([]);
    }

    return (
            <MapContainer
                center={[28.795319, -81.308297]}
                zoom={14}
                scrollWheelZoom={true}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {addresses.map((address) => (
                    <Marker
                        key={address._id}
                        position={[address.lat, address.lng]}
                        icon={whichIcon(address)}
                        eventHandlers={{
                            click: () => {
                                if(selected.indexOf(address._id) === -1) {
                                    setSelected([...selected, address._id])
                                } else {
                                    setSelected(selected.filter(x => x !== address._id))
                                }
                            }
                        }}
                    />
                ))}

                <Paper style={{padding: '1em', display: 'flex', flexDirection: 'column', gap: '1em', position: "absolute", right: '1em', top: '2em', zIndex: 1000, width: '20em'}}>

                    <Button variant={'contained'} onClick={() => setSelected([])}>
                        Clear
                    </Button>
                    <Autocomplete
                        renderInput={params => (<TextField {...params} label={"Group Name"}/>)}
                        options={groups}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                            if(newValue){
                                setAddressGroups(newValue._id);
                            }
                        }}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ gap: '1em' }}>
                                <div className={option.className} style={{
                                    height: '2em',
                                    width: '2em',
                                    borderRadius: '1em'
                                }}/>
                                {' '}
                                {option.name}

                                <div>({addresses.filter(x=>x.groupId === option._id).length})</div>
                            </Box>
                        )}
                    />
                </Paper>
            </MapContainer>

    )
}
