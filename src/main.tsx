import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import netlifyIdentity from 'netlify-identity-widget'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

netlifyIdentity.init();
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});

netlifyIdentity.on('login', () => {
    window.location.reload();
});
netlifyIdentity.on('logout', () => {
    window.location.reload();
});

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("Google Client ID: ", googleClientId)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={googleClientId}>
            <QueryClientProvider client={queryClient}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <App/>
                </LocalizationProvider>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
