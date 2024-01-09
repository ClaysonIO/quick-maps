import {Paper} from "@mui/material";
import React from "react";
import {IAddressVisit} from "../../netlify/functions/Types/AddressSchema.ts";

export const HistoryItem = ({item}: { item: IAddressVisit }) => {
    return <Paper style={{padding: '1em', display: 'flex', flexDirection: 'column', gap: '1em'}}>
        <div style={{display: 'flex', gap: '1em', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={'my-div-icon ' + item.status.toLocaleLowerCase()} style={{width: '1em', height: '1em'}}></div>
            <div style={{fontWeight: 'bold', flex: 1}}>{item.status.toLocaleUpperCase()}</div>
            <small>{item.user}</small>
            <small>{!!item.date && new Date(item.date).toLocaleString()}</small>
        </div>
        <div>{item.notes}</div>
    </Paper>
}