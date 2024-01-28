import {Paper} from "@mui/material";
import React from "react";
import {IVisit} from "../Interfaces/VisitSchema.ts";
import {IResolutionType} from "../Interfaces/ResolutionTypeSchema.ts";

export const HistoryItem = ({resolutionTypes, visit}: {resolutionTypes: IResolutionType[], visit: IVisit }) => {
    const resolutionType = resolutionTypes.find((x) => x.id === visit.resolutionId)

    return <Paper style={{padding: '1em', display: 'flex', flexDirection: 'column', gap: '1em'}}>
        <div style={{display: 'flex', gap: '1em', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={'my-div-icon '} style={{backgroundColor: resolutionType?.color, width: '1em', height: '1em'}}></div>
            <div style={{fontWeight: 'bold', flex: 1}}>{resolutionType?.name.toLocaleUpperCase()}</div>
            <small>{visit.email}</small>
            <small>{new Date(visit.dateTime).toLocaleString()}</small>
        </div>
        <div>{visit.notes}</div>
    </Paper>
}