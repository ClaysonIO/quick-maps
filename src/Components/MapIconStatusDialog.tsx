import {useVisitResolutions} from "../Hooks/useVisitResolutions.ts";
import React from "react";
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {HistoryItem} from "./HistoryItem.tsx";
import {IAddress, IAddressVisit, VisitResolution} from "../../netlify/functions/Types/AddressSchema.ts";

export const MapIconStatusDialog = ({address, addVisit, handleClose}: {
    handleClose: () => void,
    address: IAddress,
    addVisit: (_id: string, newHistory: IAddressVisit) => void
}) => {

    const {visitResolutions: options} = useVisitResolutions();

    const [notes, setNotes] = React.useState('')
    const [value, setValue] = React.useState<{ name: string, id: VisitResolution } | undefined>()

    function saveChanges() {
        if (value) {
            addVisit(address._id, {status: value.id, notes, date: new Date(), user: ''});
        }
        handleClose()
    }


    return (
        <Dialog fullWidth open={true} onClose={() => handleClose()}>
            <DialogTitle>Record a Visit</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                {address.names?.map((name, index) => <div key={index}>{name}</div>)}

                <a href={`https://www.google.com/maps/search/?api=1&query=${address.address}`} target={'_blank'}>{address.address}</a>

                <div style={{display: 'flex', gap: '1em'}}>

                    <Autocomplete
                        sx={{flex: 1}}
                        renderInput={params => (<TextField
                            {...params}
                            sx={{flex: 1}}
                            label={"Status"}
                        />)}
                        getOptionKey={(option) => option.id}
                        getOptionLabel={(option) => option.name}
                        options={options}
                        value={value}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setValue(newValue)
                            }
                        }}
                    />
                    <Button disabled={!value} onClick={saveChanges}>Save</Button>
                </div>
                <TextField label={'Notes'} multiline={true} rows={3} value={notes}
                           onChange={(e) => setNotes(e.target.value)}/>

                <h3>History</h3>
                {address.history.sort((a,b)=>new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, index) => <HistoryItem key={index} item={item}/>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}