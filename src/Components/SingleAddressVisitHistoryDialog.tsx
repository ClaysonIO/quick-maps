import React from "react";
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {HistoryItem} from "./HistoryItem.tsx";
import {IMergedAddress} from "../Interfaces/MergedAddressSchema.ts";
import {useVisits} from "../Hooks/useVisits.ts";
import {useResolutionTypes} from "../Hooks/useResolutionTypes.ts";
import {IResolutionType} from "../Interfaces/ResolutionTypeSchema.ts";

export const SingleAddressVisitHistoryDialog = ({projectId, mergedAddress, handleClose}: {
    projectId: string,
    handleClose: () => void,
    mergedAddress: IMergedAddress
}) => {
    const {addMultiple: addVisits} = useVisits({projectId});
    const {data: options} = useResolutionTypes({projectId})

    const [notes, setNotes] = React.useState('')
    const [value, setValue] = React.useState<IResolutionType | undefined>()

    function saveChanges() {
        if (value) {
            // addVisit(mergedAddress._id, {status: value.id, notes, date: new Date(), user: ''});
        }
        handleClose()
    }


    return (
        <Dialog fullWidth open={true} onClose={() => handleClose()}>
            <DialogTitle>Record a Visit</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                {mergedAddress.occupants?.map((occupant) => <div key={occupant.id}>{occupant.name}</div>)}

                <a href={`https://www.google.com/maps/search/?api=1&query=${mergedAddress.address}`} target={'_blank'}>{mergedAddress.address}</a>

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
                {mergedAddress.visits
                    .map((item, index) => <HistoryItem key={index} item={item}/>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}