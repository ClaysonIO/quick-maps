import {useLocalStorage} from "usehooks-ts";
import {TokenResponse, useGoogleLogin} from "@react-oauth/google";
import {useEffect, useState} from "react";
import axios from "axios";

export function useUser() {
    const [credentials, setCredentials] = useLocalStorage<TokenResponse | undefined>('google_credentials', undefined);
    const [user, setUser] = useState<{ email: string, name: string, picture: string }>();
    const [loading, setLoading] = useState(true);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            setCredentials(tokenResponse);
        },
        scope: 'https://www.googleapis.com/auth/drive.file profile email',
    });


    function logout() {
        setCredentials(undefined);
        setUser(undefined);
    }

    useEffect(() => {
        if (credentials) {
            axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {params: {access_token: credentials.access_token}}).then((response) => {
                console.log("USER", response.data);
                setUser(response.data);
                setLoading(false);
            })
                .catch(() => {
                    logout();
                    setLoading(false);
                })
        } else{
            setLoading(false);
        }
    }, [credentials]);


    return {login, logout, user, credentials}
}