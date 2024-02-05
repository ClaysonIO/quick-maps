import {useDateRange} from "../Hooks/useDateRange.tsx";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import React from "react";

export function DateRangeDialog({open, setOpen}: { open: boolean, setOpen: (open: boolean) => void }) {
    const {startDate, endDate, setStartDate, setEndDate} = useDateRange()

    function clearDates() {
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <>

            <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Choose a Date Range</DialogTitle>

                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1em', paddingTop: '1em'}}>
                    <div style={{height: '.25em'}}/>
                    <DatePicker label="Start Date" value={startDate} onChange={(v) => setStartDate(v)}/>
                    <DatePicker label="End Date" value={endDate} onChange={(v) => setEndDate(v)}/>
                </DialogContent>

                <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button color={'error'} variant={'outlined'} onClick={() => clearDates()}>Clear Dates</Button>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}