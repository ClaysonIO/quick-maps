import {useLocalStorage} from "usehooks-ts";
import {VisitResolution} from "./useVisitResolutions.ts";

export interface IAddress {
    _id: string;
    address: string;
    url: string;
    name: string;
    lat: number;
    lng: number;
    groupId?: string;
    status: VisitResolution;
    history: {
        date: Date,
        status: VisitResolution;
        notes: string;
        user: string;
    }[]
}

export function useAddresses(groupId?: string) {

    const [addresses, setAddresses] = useLocalStorage<IAddress[]>('addresses', [])

    function addVisit(_id: string, newHistory: IAddress['history'][0]) {
        const updatedAddresses = addresses.map(address => {
            if (address._id === _id) {
                return {...address, status: newHistory.status, history: [...address.history, newHistory]}
            }
            return address;
        })
        setAddresses(updatedAddresses);
    }

    return {
        addresses: addresses.filter(address => groupId ? address.groupId === groupId : true),
        addVisit,
        setAddresses
    }
}