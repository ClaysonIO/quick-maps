import React, {useState} from 'react';
import XLSX from "xlsx";
import {Button, TextField} from "@mui/material";
import netlifyIdentity from "netlify-identity-widget";
import {useAddresses} from "../Hooks/useAddresses.ts";
import {IAddress} from "../../netlify/functions/Types/AddressSchema.ts";

export function SettingsPage() {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const nameFileRef = React.useRef<HTMLInputElement>(null);

    const {addresses, setAddresses} = useAddresses();
    const uploadAddresses = async (e: any) => {
        const f = e.target.files?.[0];

        const data = await f.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);

        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

        const newAddresses = json.map((x: any, index: number) => ({
            _id: index.toString(),
            address: x.Location,
            names: [],
            url: '',
            lat: x.Latitude,
            lng: x.Longitude,
            status: 'not-visited',
            history: []
        }) as IAddress);

        setAddresses(newAddresses)
    };
    const addNames = async (e: any) => {
        const f = e.target.files?.[0];

        const data = await f.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);

        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as {
            Name: string,
            Address: string
        }[]

        console.log("JSON", json);
        const newAddresses = addresses.slice().map(x => ({...x, names: []})) as IAddress[];

        json.forEach(({Name, Address}) => {
            if (!Name || !Address) return;
            const address = newAddresses.find(x => {
                return x.address?.trim().toLowerCase().startsWith(Address.toLowerCase().trim())
            });
            if (address) {
                address.names.push(Name);
            }
        });

        setAddresses(newAddresses);
    };

    const [users, setUsers] = useState<string>('')

    async function addUsers(){
        const splitUsers = users.split('\n')

        await netlifyIdentity.refresh();

        fetch('/.netlify/functions/add-users', {
            method: 'POST',
            body: JSON.stringify({users: splitUsers}),
            headers: {
                Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
            }
        });

        setUsers('')
    }

    return <div style={{padding: '1em', display: 'flex', flexDirection: 'column', gap: '1em'}}>
        <h3>Note: This page will only work if you're the creator of this site</h3>

        <Button variant={'contained'} onClick={() => fileRef.current?.click()}>
            Add Addresses
        </Button>
        <input ref={fileRef} type={'file'} onChange={uploadAddresses} style={{display: 'none'}}/>

        <Button variant={'contained'} onClick={() => nameFileRef.current?.click()}>
            Upload Names
        </Button>
        <input ref={nameFileRef} type={'file'} onChange={addNames} style={{display: 'none'}}/>

        <TextField label={'Users'} multiline={true} rows={5} value={users} onChange={(e)=>setUsers(e.target.value)}/>
        <Button variant={'contained'} onClick={addUsers}>Add Users</Button>

    </div>;
}