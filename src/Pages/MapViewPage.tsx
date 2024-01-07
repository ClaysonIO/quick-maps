import React from 'react';
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import {AddressStatus, IAddress, useAddresses} from "../Hooks/useAddresses.ts";
import {Marker} from "react-leaflet";
import L from 'leaflet';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useParams} from "react-router";

export function MapViewPage() {
    const {groupId} = useParams() as { groupId: string };

    const pendingIcon = L.divIcon({className: 'my-div-icon pending'});
    const noAnswerIcon = L.divIcon({className: 'my-div-icon noAnswer'});
    const successIcon = L.divIcon({className: 'my-div-icon success'});
    const movedIcon = L.divIcon({className: 'my-div-icon moved'});

    function whichIcon(status: string) {
        switch (status) {
            case 'pending':
                return pendingIcon;
            case 'noAnswer':
                return noAnswerIcon;
            case 'success':
                return successIcon;
            case 'moved':
                return movedIcon;
            default:
                return pendingIcon;
        }
    }

    const {addresses, updateAddress} = useAddresses(groupId);

    const [selectedAddress, setSelectedAddress] = React.useState<IAddress | null>(null)

    return (
        <div style={{height: '100vh', width: '100vw'}}>
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
                        icon={whichIcon(address.status)}
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
                updateAddress={updateAddress}
                handleClose={() => setSelectedAddress(null)}
            />}

        </div>
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
