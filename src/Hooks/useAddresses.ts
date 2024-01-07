import {useEffect, useState} from "react";
import {useLocalStorage} from "usehooks-ts";

export type AddressStatus = 'pending' | 'noAnswer' | 'success' | 'moved';
export interface IAddress{
    _id: string;
    address: string;
    url: string;
    name: string;
    lat: number;
    lng: number;
    groupId?: string;
    status: AddressStatus;
    history: {
       date: Date,
         status: AddressStatus;
       user: string;
    }[]
}

export interface IGroup{
    id: string;
    name: string;
    className: string;
}

export function useGroups(){
    const groups: IGroup[] = [
        {id: 'A', name: 'Group A', className: 'group-A'},
        {id: 'B', name: 'Group B', className: 'group-B'},
        {id: 'C', name: 'Group C', className: 'group-C'},
        {id: 'D', name: 'Group D', className: 'group-D'},
        {id: 'E', name: 'Group E', className: 'group-E'},
        {id: 'F', name: 'Group F', className: 'group-F'},
        {id: 'G', name: 'Group G', className: 'group-G'},
        {id: 'H', name: 'Group H', className: 'group-H'},
        {id: 'I', name: 'Group I', className: 'group-I'},
        {id: 'J', name: 'Group J', className: 'group-J'},
        {id: 'K', name: 'Group K', className: 'group-K'},
        {id: 'L', name: 'Group L', className: 'group-L'},
        {id: 'M', name: 'Group M', className: 'group-M'},
        {id: 'N', name: 'Group N', className: 'group-N'},
        {id: 'O', name: 'Group O', className: 'group-O'},
        {id: 'P', name: 'Group P', className: 'group-P'},
        {id: 'Q', name: 'Group Q', className: 'group-Q'},
        {id: 'R', name: 'Group R', className: 'group-R'},
        {id: 'S', name: 'Group S', className: 'group-S'},
        {id: 'T', name: 'Group T', className: 'group-T'},
        {id: 'U', name: 'Group U', className: 'group-U'},
        {id: 'V', name: 'Group V', className: 'group-V'},
        {id: 'W', name: 'Group W', className: 'group-W'},
        {id: 'X', name: 'Group X', className: 'group-X'},
        {id: 'Y', name: 'Group Y', className: 'group-Y'},
        {id: 'Z', name: 'Group Z', className: 'group-Z'},
    ]
    return {groups}
}

export function useAddresses(){

    const [addresses, setAddresses] = useLocalStorage<IAddress[]>('addresses', [])

    // const [addresses, setAddresses] = useState<IAddress[]>([]);

    useEffect(() => {
        setAddresses(addresses);
    }, []);

    function updateAddress(newAddress: Pick<IAddress, '_id' | 'status'>){
        const updatedAddresses = addresses.map(address => {
            if(address._id === newAddress._id){
                return {...address, status: newAddress.status}
            }
            return address;
        })
        setAddresses(updatedAddresses);
    }

        return {addresses, updateAddress, setAddresses}
}