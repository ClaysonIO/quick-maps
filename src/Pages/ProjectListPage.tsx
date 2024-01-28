import {IProject, useProjects} from "../Hooks/useProjects.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {Navigation} from "@mui/icons-material";

export function ProjectListPage() {
    const {data: sheets} = useProjects();
    const navigate = useNavigate();

    const columns: GridColDef<IProject>[] = [
        {field: 'actions', type: 'actions', width: 40, getActions: ({row}) => [
            //@ts-expect-error
                <GridActionsCellItem component={NavLink} to={`/projects/${row.id}/addresses`} label={'Edit'} icon={<Navigation/>}/>
            ]},
        {field: 'name', headerName: 'Name', flex: 1},
    ]

    return (
        <div style={{padding: '2em'}}>
            <Button component={NavLink} to={'/projects/create'}>Create New Project</Button>
            <DataGrid
                columns={columns}
                rows={sheets}
                onRowClick={(params) => {navigate(`/projects/${params.row.id}/addresses`)}}
            />
        </div>
    )

}