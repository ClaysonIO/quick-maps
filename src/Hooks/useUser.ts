import {useLocalStorage} from "usehooks-ts";
import {TokenResponse, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export function useUser() {
    const queryClient = useQueryClient();
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
        enabled: !!credentials,
        refetchOnWindowFocus: true
    })


    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            setCredentials(tokenResponse);
            queryClient.invalidateQueries({queryKey: ['user']});
            refetch();
        },
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets profile email',
    });

    function logout() {
        setCredentials(undefined);
        refetch();
    }


    return {login, logout, user, credentials}
}