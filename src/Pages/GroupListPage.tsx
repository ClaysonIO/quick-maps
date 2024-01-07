import React from 'react';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IGroup, useGroups} from "../Hooks/useAddresses.ts";
import {Button} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";

export function GroupListPage(){
    const navigate = useNavigate();
    const columns: GridColDef<IGroup>[] = [

        { field: 'name', headerName: 'Name', flex: 1 },
    ]

    const {groups} = useGroups();

    return (<>
            <Button component={NavLink} to={`/groups/new`}>New Group</Button>
            <DataGrid getRowId={x=>x._id} columns={columns} rows={groups} onRowClick={({row})=>navigate(`/map/${row._id}`)}/>

    </>
    )
}