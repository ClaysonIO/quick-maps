import React, {useMemo} from 'react';
import {DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";

import {useParams} from "react-router";
import {useMergedAddresses} from "../Hooks/useMergedAddresses.ts";
import {useGeocodes} from "../Hooks/useGeocodes.ts";
import {IMergedAddress} from "../Interfaces/MergedAddressSchema.ts";
import {Box, Button} from '@mui/material';
import {NavLink} from "react-router-dom";
import {useResolutionFilters} from "../Hooks/useResolutionFilters.ts";
import {useResolutionTypes} from "../Hooks/useResolutionTypes.ts";

export function AddressListPage(){
    const {projectId} = useParams() as {projectId: string};
    const {data: mergedAddresses} = useMergedAddresses({projectId});
    const {filters} = useResolutionFilters();
    const {data: resolutionTypes} = useResolutionTypes({projectId});
    const {generateGeocodesFromAddresses} = useGeocodes({projectId});

    const missingGeoCodes = useMemo(()=>mergedAddresses
        .filter(x=>!x.geocode?.latitude),
        [mergedAddresses])
    function generateMissingGeocodes(){
        generateGeocodesFromAddresses(missingGeoCodes.map(x=>x.address));
    }

    const columns: GridColDef<IMergedAddress>[] = [
        // {field: 'actions', width: 40, type: 'actions', getActions: ({row}) => [
        //     <GridActionsCellItem label={'Edit'} icon={<Add/>} onClick={()=>setSelectedAddress(row)}/>
        //     ]},
        { field: 'occupants', headerName: 'Name', flex: 2, valueGetter: ({row})=>row.occupants.map(x=>x.name).join(', ')},
        { field: 'address', headerName: 'Address', flex: 1, renderCell: ({row})=> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.address)}`} target={'_blank'}>{row.address}</a>},
        {
            field: 'status',
            headerName: 'Status',
            type: 'singleSelect',
            valueGetter: ({row}) => row.status?.name
        },
        {field: 'geocode', headerName: 'Geocode', type: 'boolean', valueGetter: ({row}) => !!row.geocode?.latitude},
    ]


    const filteredAddresses = useMemo(() => mergedAddresses
        .filter((address) => {
            if (!filters.length || filters.length === resolutionTypes.length) return true;
            return !!address.status && filters.includes(address.status.id)
        }), [filters, mergedAddresses]);

    return (<div style={{padding: '2em'}}>

            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button component={NavLink} to={`/projects/${projectId}/addresses/add`}>Add Addresses</Button>
                <Button disabled={!missingGeoCodes.length} variant={missingGeoCodes.length ? 'contained' : undefined} onClick={()=>generateMissingGeocodes()}>Generate Missing Geocodes</Button>

            </Box>
            <DataGrid
                slots={{toolbar: CustomToolbar}}
                density={'compact'}
                columns={columns}
                rows={filteredAddresses}
            />
    </div>
    )
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}