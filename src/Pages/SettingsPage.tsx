import React from 'react';
import {IAddress, useAddresses} from "../Hooks/useAddresses.ts";
import XLSX from "xlsx";
import {Button} from "@mui/material";

export function SettingsPage() {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const nameFileRef = React.useRef<HTMLInputElement>(null);

    const {addresses, setAddresses} = useAddresses();
    const uploadAddresses = async (e: any)=>{
        const f = e.target.files?.[0];

        const data = await f.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);

        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

        const newAddresses = json.map((x: any, index: number)=>({
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
    const addNames = async (e: any)=>{
        const f = e.target.files?.[0];

        const data = await f.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);

        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as {Name: string, Address: string}[]

        console.log("JSON", json);
        const newAddresses = addresses.slice().map(x=>({...x, names: []})) as IAddress[];

        json.forEach(({Name, Address})=>{
            if(!Name || !Address) return;
            const address = newAddresses.find(x=>{
                return x.address?.trim().toLowerCase().startsWith(Address.toLowerCase().trim())
            });
            if(address){
                address.names.push(Name);
            }
        });

        setAddresses(newAddresses);
    };

    return <div style={{padding: '1em'}}>



            <Button variant={'contained'} onClick={()=>fileRef.current?.click()}>
                Add Addresses
            </Button>
            <input ref={fileRef} type={'file'} onChange={uploadAddresses} style={{display: 'none'}}/>

            <Button variant={'contained'} onClick={()=>nameFileRef.current?.click()}>
                Upload Names
            </Button>
            <input ref={nameFileRef} type={'file'} onChange={addNames} style={{display: 'none'}}/>
  </div>;
}