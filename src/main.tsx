import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import netlifyIdentity from 'netlify-identity-widget'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

netlifyIdentity.init();
const queryClient = new QueryClient();

netlifyIdentity.on('login', () => {
    window.location.reload();
});
netlifyIdentity.on('logout', () => {
    window.location.reload();
});
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </React.StrictMode>,
)
