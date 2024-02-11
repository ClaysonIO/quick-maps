import {useSearchParams} from "react-router-dom";
import {useProjects} from "../Hooks/useProjects.ts";
import React, {useEffect, useMemo} from "react";
import QRCode from "react-qr-code";
import {useParams} from "react-router";
import {Button, TextField} from "@mui/material";
import {GoogleSpreadsheet} from "google-spreadsheet";
import {toast} from "react-toastify";
import {useUser} from "../Hooks/useUser.ts";

export function ProjectSharePage(){
    const {projectId} = useParams() as {projectId: string};
    const {singleData: project} = useProjects(projectId);
    const {credentials} = useUser();

    const [emails, setEmails] = React.useState<string>('')
    const toastId = React.useRef<any>(null);

    const shareUrl = useMemo(()=>{
        if(!project) return;
        return `${window.location.origin}/app/projects/${projectId}/acceptInvitation?name=${encodeURIComponent(project.name)}`
    }, [project])

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
                emailMessage: `You have been invited to use the Visit Tracker app. It is backed by a Google Spreadsheet, which you have been added to. To access the app, please visit ${shareUrl}`})
        }
        toast.dismiss(toastId.current);
    }

    return (
        <div style={{padding: '2em'}}>
            <h1>Share Project</h1>

            <p>There are two steps to sharing this sheet with a user. First, you must give them access to the Google
                Sheet, which you can do below. Then you must share this invitation link with them -- you can use the QR
                code, share the link, or send them an email.</p>

            <h2>Step 1: Share Google Sheet</h2>

            <p>Either go to <a href={`https://docs.google.com/spreadsheets/d/${projectId}`}>The Spreadsheet</a> and
                share the sheet, or add their emails below and press 'Share Sheet' (one email per row)</p>

            <TextField
                multiline
                fullWidth
                rows={5}
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                variant={'outlined'}
            />
            <Button onClick={addUsers}>Grant Access</Button>

            <h2>Step 2: Share this tool</h2>

            <p>You can now share this link with your users or share the QR code at the bottom of the page. </p>

            <div>
                <p>Share this link with the user you want to invite to your project</p>
                <p style={{overflowWrap: 'break-word'}}><a href={shareUrl} target={'_blank'}>{shareUrl}</a></p>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1em'}}>
                {shareUrl && <QRCode
                    size={256}
                    // style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={shareUrl}
                    viewBox={`0 0 256 256`}
                />}
            </div>
        </div>
    )
}