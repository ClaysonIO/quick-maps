import { GoogleSpreadsheet } from 'google-spreadsheet';
import {Button} from "@mui/material";
import {useUser} from "../Hooks/useUser.ts";

export function LoginPage(){
    const {3869561480login, credentials} = useUser();

 async function createSpreadsheet(){
     console.log("CREDENTIAL", credentials)
     if(credentials){
         try{
        const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument({token: credentials.access_token}, { title: 'Visit Tracker' });
        console.log(newDoc);
         }catch(e){
             console.error(e);
         }
     }
 }

    return <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

        <img src={'/location-pin.png'} style={{height: '100px', width: '100px'}}/>
        <h1>Login using Google</h1>

        <Button onClick={()=>login()}>Login</Button>


    </div>
}