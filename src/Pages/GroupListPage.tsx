import React from 'react';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import { useNavigate} from "react-router-dom";
import {IGroup, useGroups} from "../Hooks/useGroups.ts";
import {useAddresses} from "../Hooks/useAddresses.ts";

export function GroupListPage(){
    const navigate = useNavigate();
    const {addresses} = useAddresses();
    const columns: GridColDef<IGroup>[] = [
        { field: 'color', headerName: 'Name',width: 50, renderCell: ({row})=> <div className={'my-div-icon ' + row.className} style={{width: '1em', height: '1em'}}/> },
        { field: 'name', headerName: 'Name', flex: 1 , renderCell: ({row})=>`${row.name} (${addresses.filter(x=>x.groupId === row._id).length})`},
    ]

    const {groups} = useGroups();

    return (<div style={{padding: '2em'}}>

            <DataGrid getRowId={x=>x._id} columns={columns} rows={groups} onRowClick={({row})=>navigate(`/map/${row._id}`)}/>
    </div>
    )
}