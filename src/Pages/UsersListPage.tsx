import React from 'react';
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {useUsers} from "../Hooks/useUsers.ts";
import {IUser} from "../../netlify/functions/add-users.ts";
import {Check, Delete} from "@mui/icons-material";

export function UsersListPage() {
    const {data: users, setUsersMutation} = useUsers();


    function deleteUser(user: IUser) {
        setUsersMutation.mutate({action: 'delete', user});
    }

    function enableUser(user: IUser) {
        setUsersMutation.mutate({action: 'patch', user: {...user, active: true}});
    }

    const columns: GridColDef<IUser>[] = [
        {field: 'email', headerName: 'Email', flex: 1},
        {field: 'active', headerName: 'Active', type: 'boolean'},

        {
            field: 'actions', type: 'actions', headerName: '', getActions: ({row}) => [
                <GridActionsCellItem icon={<Check/>} label={"Enable User"} onClick={() => {
                    enableUser(row)
                }}/>,
                <GridActionsCellItem icon={<Delete/>} label={"Delete User"} onClick={() => {
                    deleteUser(row)
                }}/>,
            ]
        }
    ]

    return (<div style={{padding: '2em'}}>

            <DataGrid
                getRowId={x => x._id!}
                columns={columns}
                rows={users}
            />
        </div>
    )
}