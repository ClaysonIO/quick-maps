import React from 'react';
import {IAddress, useAddresses} from "../Hooks/useAddresses.ts";
import XLSX from "xlsx";
import {Button} from "@mui/material";

export function SettingsPage() {
    const fileRef = React.useRef<HTMLInputElement>(null);

    const {setAddresses} = useAddresses();
    const uploadAddresses = async (e: any)=>{
        const f = e.target.files?.[0];

        const data = await f.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);

        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

        const newAddresses = json.map((x: any, index: number)=>({
            _id: index.toString(),
            address: x.Location,
            name: '',
            url: '',
            lat: x.Latitude,
            lng: x.Longitude,
            status: 'pending',
            history: []
        }) as IAddress);

        setAddresses(newAddresses)
    };

    return <div>


        <div style={{position: "absolute", right: '1em', bottom: '2em', zIndex: 1000}}>

            <Button variant={'contained'} onClick={()=>fileRef.current?.click()}>
                Add Addresses
            </Button>
            <input ref={fileRef} type={'file'} onChange={uploadAddresses} style={{display: 'none'}}/>
        </div>
  </div>;
}