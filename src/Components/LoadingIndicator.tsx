import {CircularProgress} from "@mui/material";
import React from "react";

export function LoadingIndicator({loading}: { loading?: boolean }) {
    return (
        <>
            {loading &&  <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1000
            }}>
                <CircularProgress size={200}/>
            </div>
            }
        </>
    );
}