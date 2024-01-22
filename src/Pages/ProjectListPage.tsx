import {useProjects} from "../Hooks/useProjects.ts";
import {DataGrid} from "@mui/x-data-grid";
import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export function ProjectListPage() {
    const {data: sheets} = useProjects();
    const navigate = useNavigate();

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', flex: 1},
    ]

    return (
        <div style={{padding: '2em'}}>
            <Button component={NavLink} to={'/projects/create'}>Create New Project</Button>
            <DataGrid
                columns={columns}
                rows={sheets}
                onRowClick={(params) => {navigate(`/projects/${params.row.id}/addresses/add`)}}
            />
        </div>
    )

}