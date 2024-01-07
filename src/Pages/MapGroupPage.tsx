import React, {useState} from 'react';
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import {AddressStatus, IAddress, useAddresses, useGroups} from "../Hooks/useAddresses.ts";
import {Marker} from "react-leaflet";
import L from 'leaflet';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Paper,
    TextField
} from "@mui/material";

export function MapGroupPage() {

    const [selected, setSelected] = useState<string[]>([])

    function whichIcon(address: IAddress) {
        if(selected.indexOf(address._id) !== -1){
            return L.divIcon({className: 'my-div-icon moved'})
        }
        if(address.groupId){
            return L.divIcon({className: `my-div-icon group-${address.groupId}`})
        }
        return L.divIcon({className: 'my-div-icon pending'})
    }

    const {addresses, setAddresses} = useAddresses();
    const {groups} = useGroups();

    function setAddressGroups(groupId: string){
        const selectedAddresses = addresses.map(x => {

            if (selected.indexOf(x._id) !== -1) {
                return {...x, groupId}
            }
            return x;
        });
        setAddresses(selectedAddresses);
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
                                setSelected([...selected, address._id]);
                            }
                        }}
                    />
                ))}

                <Paper style={{padding: '1em', display: 'flex', flexDirection: 'column', gap: '1em', position: "absolute", right: '1em', bottom: '2em', zIndex: 1000, width: '20em'}}>

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

export const MapIconStatusDialog = ({address, updateAddress, handleClose}: {
    handleClose: () => void,
    address: IAddress,
    updateAddress: (address: Pick<IAddress, '_id' | 'status'>) => void
}) => {


    function saveChanges() {

        updateAddress({_id: address._id, status: value.value})
        handleClose()
    }

    const options: { label: string, value: AddressStatus }[] = [
        {label: 'Pending', value: 'pending'},
        {label: 'No Answer', value: 'noAnswer'},
        {label: 'Success', value: 'success'},
        {label: 'Moved', value: 'moved'},
    ]

    const [value, setValue] = React.useState(options.find(x => x.value === address.status) ?? options[0])


    return (
        <Dialog fullWidth open={true} onClose={() => handleClose()}>
            <DialogTitle>Address</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                <div>{address.name}</div>
                <div>{address.address}</div>

                <Autocomplete
                    renderInput={params => (<TextField
                        {...params}
                        label={"Status"}
                    />)}
                    options={options}
                    value={value}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setValue(newValue)
                        }
                    }}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => saveChanges()}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    )
}
