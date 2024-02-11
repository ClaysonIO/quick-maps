import {NavLink, useSearchParams} from "react-router-dom";
import {useProjects} from "../Hooks/useProjects.ts";
import {useEffect} from "react";
import {useParams} from "react-router";

export function ProjectAcceptInvitationPage(){
    const {projectId} = useParams() as {projectId: string};
    const [urlParams] = useSearchParams();
    const {addProject} = useProjects();

    const name = urlParams.get('name');

    useEffect(() => {
        if(projectId && name) {
            addProject({
                id: projectId,
                name
            })
        }
    }, [urlParams, addProject]);

    if(!projectId || !name){
        return (
            <div style={{padding: '1em'}}>
                <h1>Invalid URL</h1>
                <p>Please contact the user who shared this application, and ask them to re-share the project</p>
            </div>
        )
    } else {
        return (
            <div style={{padding: '1em'}}>
                <h1>Added Project</h1>
                <p>The project <b>{name}</b> has been added to your project list. To view it, please follow the link below.</p>

                <NavLink to={`/projects/${projectId}/map`}>View Project</NavLink>
            </div>
        )
    }
}