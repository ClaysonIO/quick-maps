import {Button, CircularProgress, TextField} from "@mui/material";
import {useState} from "react";
import {useProjects} from "../Hooks/useProjects.ts";
import {useNavigate} from "react-router-dom";

export function ProjectCreatePage(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const {create, status} = useProjects();
    const [name, setName] = useState<string>('Default Visit Tracker Sheet');

    async function createProject(){
        if(name){
            setLoading(true)
            const newProject = await create(name);
            navigate(`/projects/${newProject?.id}/map`)
        }
    }

    if(loading) return (<div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1>Creating Project...</h1>
        <CircularProgress size={300}/>
        <p>{status}</p>
    </div>)

    return <div style={{padding: '2em', display: 'flex', flexDirection: 'column', gap: '1em'}}>
    <TextField label={'Google Sheet Name'} value={name} onChange={(e)=>setName(e.target.value)}/>

        <p>This will create a new spreadsheet in your Google Drive, which will act as the database for this application. You can share it with others, and they will be able to view and edit it.</p>

        <Button disabled={!name} onClick={()=>{createProject()}}>Create New Project</Button>
    </div>

}