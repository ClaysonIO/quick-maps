import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import netlifyIdentity from 'netlify-identity-widget'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GoogleOAuthProvider} from "@react-oauth/google";

netlifyIdentity.init();
const queryClient = new QueryClient();

netlifyIdentity.on('login', () => {
    window.location.reload();
});
netlifyIdentity.on('logout', () => {
    window.location.reload();
});

// const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleClientId = "597391670929-d4gvgp7occm2tk2dpiph33qtkmts8bo7.apps.googleusercontent.com";

console.log("Google Client ID: ", googleClientId)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={googleClientId}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
