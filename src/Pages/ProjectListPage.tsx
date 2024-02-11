import {IProject, useProjects} from "../Hooks/useProjects.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {ShareProjectDialog} from "../Components/ShareDialog.tsx";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

export function ProjectListPage() {
    const {data: sheets} = useProjects();
    const navigate = useNavigate();
    const [share, setShare] = useState<string>();

    const columns: GridColDef<IProject>[] = [
        {field: 'actions', type: 'actions', width: 40, getActions: ({row}) => [
            //@ts-expect-error
                <GridActionsCellItem component={NavLink} to={`/projects/${row.id}/map`} label={'Edit'} icon={<KeyboardArrowRightIcon/>}/>
            ]},
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'share', type: 'actions', getActions: ({row}) => [
                //@ts-expect-error
                <GridActionsCellItem component={NavLink} to={`/projects/${row.id}/share`} label={'Share'} icon={<ForwardToInboxIcon/>}/>
            ]},
    ]

    return (
        <div style={{padding: '2em'}}>
            <Button component={NavLink} to={'/projects/create'}>Create New Project</Button>
            <DataGrid
                columns={columns}
                rows={sheets}
                onRowClick={(params) => {navigate(`/projects/${params.row.id}/map`)}}
            />

            {share && <ShareProjectDialog projectId={share} onClose={()=>setShare(undefined)}/>}
        </div>
    )

}