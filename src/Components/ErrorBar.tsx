import {Snackbar, Alert} from "@mui/material";

export function ErrorBar({error}: { error?: string }) {
    return (
        <>
            {error && <Snackbar open>
                <Alert severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>}
        </>
    );
}