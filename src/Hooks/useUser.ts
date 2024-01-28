import {useLocalStorage} from "usehooks-ts";
import {TokenResponse, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export function useUser() {
    const [credentials, setCredentials] = useLocalStorage<TokenResponse | undefined>('google_credentials', undefined);

    const {data: user, refetch} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (credentials) {
                const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {params: {access_token: credentials.access_token}});
                console.log("USER", response.data);
                return response.data;
            }
        },
        enabled: !!credentials
    })


    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            setCredentials(tokenResponse);
            refetch();
        },
        scope: 'https://www.googleapis.com/auth/drive.file profile email',
    });

    function logout() {
        setCredentials(undefined);
        refetch();
    }


    return {login, logout, user, credentials}
}