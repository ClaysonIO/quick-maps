import {useLocalStorage} from "usehooks-ts";
import {VisitResolution} from "./useVisitResolutions.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import netlifyIdentity from "netlify-identity-widget";
import {useEffect} from "react";

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

    const queryClient = useQueryClient();

    const {data, error} = useQuery({
        queryKey: ['addresses'],
        queryFn: async () => {
            const response = await fetch('/.netlify/functions/get-addresses', {
                headers: {
                    Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                }
            });
            if (response.status === 401) throw new Error("401")
            if (!response.ok) throw new Error(response.statusText)
            return (await response.json() ?? []) as IAddress[];
        },
        placeholderData: []
    })

    const mutation = useMutation({
        mutationFn: async (addresses: IAddress[]) => {
            const response = await fetch('/.netlify/functions/set-addresses', {
                method: 'POST',
                body: JSON.stringify({addresses}),
                headers: {
                    Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                }
            });
            if (response.status === 401) throw new Error("401")
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['addresses']});
        }
    })



    useEffect(() => {
        if (error) {
            console.log(error);
            if (error.message === "401") {
                window.alert("You do not have access to this resource. Please talk to the person who invited you.")
            } else {
                window.alert("Error loading addresses. Try again later.")
            }
        }
        console.log("ERROR", error)
    }, [error])

    const addresses = data?.addresses ?? [];
    function setAddresses(addresses: IAddress[]) {
        mutation.mutate(addresses);
    }

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