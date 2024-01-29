import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import {GoogleSpreadsheet} from "google-spreadsheet";
import {useUser} from "../Hooks/useUser.ts";
import {toast} from "react-toastify";

export function ShareProjectDialog({projectId, onClose}: {projectId: string, onClose: ()=>void}){
    const [emails, setEmails] = React.useState<string>('')
    const {credentials} = useUser();
    const toastId = React.useRef<any>(null);

    async function addUsers(){
        if(!credentials) return []
        const doc = new GoogleSpreadsheet(projectId, {token: credentials.access_token});
        await doc.loadInfo();
        const splitEmails = emails.split('\n').map(x=>x.trim()).filter(x=>x.length > 0);

        if(toastId.current === null){ toastId.current = toast('Sharing Project...', {progress: 0}) }
        let i = 0;
        for(const email of splitEmails){
            i++;
            toast.update(toastId.current, {progress: i / splitEmails.length, });
            await doc.share(email, {
                role: 'writer',
                emailMessage: `You have been invited to use the Visit Tracker app. It is backed by a Google Spreadsheet, which you have been added to. To access the app, please visit https://visit-tracker.clayson.io/projects/${projectId}/invitation.`})
        }
        toast.dismiss(toastId.current);
        onClose();
    }

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Share Project</DialogTitle>
            <DialogContent>
                <p>
                    Please add users to invite to this project, one line per email address.
                </p>

                <TextField
                    multiline
                    fullWidth
                    rows={5}
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    variant={'outlined'}
                    />

                <Button onClick={addUsers}>Invite Users</Button>
            </DialogContent>

        </Dialog>
    )
}