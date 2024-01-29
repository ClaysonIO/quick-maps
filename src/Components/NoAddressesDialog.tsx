import React from "react";
import {useParams} from "react-router";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {NavLink} from "react-router-dom";
export function NoAddressesDialog(){
    const {projectId} = useParams<{projectId: string}>()

    return (
        <Dialog open>
            <DialogTitle>Addresses Not Found</DialogTitle>
            <DialogContent>
                <p>
                    You have not added any addresses to this project. Please add addresses before continuing.
                </p>

                <Button component={NavLink} to={`/projects/${projectId}/addresses/add`}>Add Addresses</Button>
            </DialogContent>

        </Dialog>
    )
}