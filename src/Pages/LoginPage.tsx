import {Button} from "@mui/material";
import {useUser} from "../Hooks/useUser.ts";

export function LoginPage() {
    const {login} = useUser();

    return <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Button variant={'contained'} size={'large'} onClick={() => login()}>Login with Google</Button>
    </div>
}