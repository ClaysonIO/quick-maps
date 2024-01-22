import React, {useMemo} from 'react';
import {DataGrid, GridActionsCellItem, GridColDef, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {useAddresses} from "../Hooks/useAddresses.ts";
import {IAddress} from "../Interfaces/AddressSchema.ts";
import {MapIconStatusDialog} from "../Components/MapIconStatusDialog.tsx";
import {useVisitResolutions} from "../Hooks/useVisitResolutions.ts";
import {Add} from "@mui/icons-material";
import {useResolutionFilters} from "../Hooks/useResolutionFilters.ts";
import {useParams} from "react-router";

export function AddressListPage(){
    const {projectId} = useParams() as {projectId: string};
    const {data: rawAddresses} = useAddresses({projectId});
    const [selectedAddress, setSelectedAddress] = React.useState<IAddress | null>(null)
    const {filters} = useResolutionFilters();
    const {getName, visitResolutions} = useVisitResolutions();

    const addresses = useMemo(()=>{
        return rawAddresses.filter(address => filters.includes(address.status));
    }, [rawAddresses, filters])

    const columns: GridColDef<IAddress>[] = [
        {field: 'actions', width: 40, type: 'actions', getActions: ({row}) => [
            <GridActionsCellItem label={'Edit'} icon={<Add/>} onClick={()=>setSelectedAddress(row)}/>
            ]},
        { field: 'names', headerName: 'Name', flex: 2, valueGetter: ({row})=>row.names.join(', ')},
        { field: 'address', headerName: 'Address', flex: 1, renderCell: ({row})=> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.address)}`} target={'_blank'}>{row.address}</a>},
        { field: 'groupId', headerName: 'Group'},
        {
            field: 'status',
            headerName: 'Status',
            type: 'singleSelect',
            valueOptions: visitResolutions.map(x=>x.name),
            valueGetter: ({row})=>getName(row.status)},
    ]

    return (<div style={{padding: '2em'}}>

            <DataGrid
                slots={{toolbar: CustomToolbar}}
                density={'compact'}
                getRowId={x=>x._id}
                columns={columns}
                rows={addresses}
            />


            {selectedAddress && <MapIconStatusDialog
                address={selectedAddress}
                addVisit={addVisit}
                handleClose={() => setSelectedAddress(null)}
            />}
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