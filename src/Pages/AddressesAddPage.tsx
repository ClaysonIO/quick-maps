import {useParams} from "react-router";
import {Button, ButtonGroup} from "@mui/material";
import React, { useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {useAddressXLSX} from "../Hooks/useAddressXLSX.ts";
import {useAddresses} from "../Hooks/useAddresses.ts";
import {IAddress} from "../Interfaces/AddressSchema.ts";
import {useGeocodes} from "../Hooks/useGeocodes.ts";
import {useNavigate} from "react-router-dom";


export function AddressesAddPage() {
    const navigate = useNavigate();
    const {projectId} = useParams() as { projectId: string };
    const {getAddressesFromSpreadsheet, createTemplate} = useAddressXLSX();
    const {addMultiple, updateAll} = useAddresses({projectId})
    const fileRef = React.useRef<HTMLInputElement>(null);
    const {data: geocodes, generateGeocodesFromAddresses} = useGeocodes({projectId});

    const [addresses, setAddresses] = useState<IAddress[]>([]);

    const columns = [
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'address', headerName: 'Address', flex: 1},
    ]

    async function importAddressesFromSpreadsheet(e: any) {
        const newAddresses = await getAddressesFromSpreadsheet(e);
        setAddresses(newAddresses);
    }

    function saveAddresses() {
        addMultiple.mutateAsync(addresses)
            .then(()=>{
                //Get all addresses that don't already have a geocode
                const geocodedAddresses = geocodes.map(x=>x.address);
                const addressesToGeocode = addresses
                    .filter(x=>!geocodedAddresses.includes(x.address))
                    .map(x=>x.address);
                return generateGeocodesFromAddresses(addressesToGeocode);
            })
            .then(()=>navigate(`/projects/${projectId}/addresses`));
    }

    function resplaceAddresses() {
        updateAll.mutateAsync(addresses)
            .then(()=>{
                //Get all addresses that don't already have a geocode
                const geocodedAddresses = geocodes.map(x=>x.address);
                const addressesToGeocode = addresses
                    .filter(x=>!geocodedAddresses.includes(x.address))
                    .map(x=>x.address);
                return generateGeocodesFromAddresses(addressesToGeocode);
            })
            .then(()=>navigate(`/projects/${projectId}/addresses`));
    }


    return (
        <main style={{padding: '1em'}}>
            <h1>Add Addresses</h1>
            <p>Google Sheet ID:&nbsp;
                <b><a
                    href={`https://docs.google.com/spreadsheets/d/${projectId}`}
                    target={'_blank'}>{projectId}</a></b>
            </p>

            <p>You'll need to import a spreadsheet with two columns -- Name, and Address. The address should be as
                complete as possible, such as <b>'123 Main St, Suite 456, Springfield IL, 78900, USA</b>'. It's ok if you
                have multiple rows with the same address -- they'll automatically be combined into a single location.</p>
            <p>You can also add this information directly into the spreadsheet by opening the Google Sheet adding them
                to the sheet named SYSTEM_Addresses</p>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <ButtonGroup variant={'outlined'}>
                    <Button variant={'contained'} onClick={() => fileRef.current?.click()}>Upload Spreadsheet</Button>
                    <Button onClick={() => createTemplate()}>Download Template</Button>
                </ButtonGroup>
                <ButtonGroup variant={'outlined'}>
                <Button
                    variant={'contained'}
                    color={'success'}
                    disabled={!addresses.length}
                    onClick={() => saveAddresses()}
                >Add New Addresses</Button>
                <Button
                    variant={'contained'}
                    color={'success'}
                    disabled={!addresses.length}
                    onClick={() => resplaceAddresses()}
                >Replace Existing Addresses</Button>
                </ButtonGroup>
            </div>
            <input ref={fileRef} type={'file'} onChange={importAddressesFromSpreadsheet} style={{display: 'none'}}/>

            <DataGrid columns={columns} rows={addresses}/>

        </main>
    )
}