import {useParams} from "react-router";
import {Button, ButtonGroup, TextField} from "@mui/material";
import React, {useMemo, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {useAddressXLSX} from "../Hooks/useAddressXLSX.ts";
import {useAddresses} from "../Hooks/useAddresses.ts";
import {IAddress} from "../Interfaces/AddressSchema.ts";

interface IParsedAddress {
    name: string;
    address: string;
}

export function AddressesAddPage() {
    const {projectId} = useParams() as { projectId: string };
    const {getAddressesFromSpreadsheet, createTemplate} = useAddressXLSX();
    const {updateAll} = useAddresses({projectId})
    const fileRef = React.useRef<HTMLInputElement>(null);

    const [addresses, setAddresses] = useState<IAddress[]>([]);

    const columns = [
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'address', headerName: 'Address', flex: 1},
    ]

    async function importAddressesFromSpreadsheet(e: any) {
        const newAddresses = await getAddressesFromSpreadsheet(e);
        setAddresses(newAddresses);
    }

    function saveAddresses(){
        updateAll.mutateAsync(addresses);
    }


    return (
        <div>
            <h1>Add Addresses</h1>
            <p>Project ID: {projectId}</p>

            <p>You'll need to import a spreadsheet with two columns -- Name, and Address. The address should be as complete as possible, such as '123 Main St, Suite 456, Springfield IL, 78900, USA'</p>
            <p>It's ok if you have multiple rows with the same address.</p>
            <p>You can also add this information directly into the spreadsheet by opening the Google Sheet adding them to the sheet named SYSTEM_Addresses</p>

            <div>
            <ButtonGroup variant={'outlined'}>
                <Button onClick={()=>createTemplate()}>Download Template</Button>
                <Button onClick={()=>fileRef.current?.click()}>Upload Excel</Button>
            </ButtonGroup>
            </div>
            <input ref={fileRef} type={'file'} onChange={importAddressesFromSpreadsheet} style={{display: 'none'}}/>

            <Button onClick={()=>saveAddresses()}>Save Addresses</Button>
            <DataGrid columns={columns} rows={addresses}/>

        </div>
    )
}