import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import netlifyIdentity from "netlify-identity-widget";
import {useEffect, useState} from "react";
import {IAddress, IAddressVisit} from "../../netlify/functions/Types/AddressSchema.ts";

export function useAddresses(groupId?: string) {

    const queryClient = useQueryClient();

    const {data, error, isLoading, isFetching} = useQuery({
        queryKey: ['addresses'],
        queryFn: async () => {
            await netlifyIdentity?.refresh()
            const response = await fetch('/.netlify/functions/get-addresses', {
                headers: {
                    Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                }
            });
            if (response.status === 401){
                throw new Error("401")
            }
            if (!response.ok) throw new Error(response.statusText)
            return (await response.json() ?? {}) as {addresses?: IAddress[]};
        },
        placeholderData: {addresses: []}
    })

    const setAddressesMutation = useMutation({
        mutationFn: async (addresses: IAddress[]) => {
            await netlifyIdentity?.refresh()
            const response = await fetch('/.netlify/functions/set-addresses', {
                method: 'POST',
                body: JSON.stringify({addresses}),
                headers: {
                    Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                }
            });
            if (response.status === 401){
                throw new Error("401")
            }
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['addresses']});
        },
        onError: (error)=>{
            setErrorString("Error setting addresses. Try again later. Error: " + error.message ?? "")
        }
    })

    const addVisitMutation = useMutation({
        mutationFn: async ({_id, visit}: {_id: string, visit: IAddressVisit}) => {
            await netlifyIdentity?.refresh()
            const response = await fetch('/.netlify/functions/add-visit', {
                method: 'POST',
                body: JSON.stringify({_id, visit}),
                headers: {
                    Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                }
            });
            if (response.status === 401){
                throw new Error("401")
            }
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['addresses']});
        },
        onError: (error)=>{
            setErrorString("Error adding visit. Try again later. Error: " + error.message ?? "")
        }
    })



    const [errorString, setErrorString] = useState<string>("");
    useEffect(() => {
        if (error) {
            console.log(error);
            if (error.message === "401") {
                setErrorString("You do not have access to this resource. Please talk to the person who invited you.")
            } else {
                setErrorString("Error loading addresses. Try again later. Error: " + error.message ?? "")
            }
            console.error("ERROR", error)
        }
    }, [error])


    const addresses = data?.addresses ?? [];
    function setAddresses(addresses: IAddress[]) {
        setAddressesMutation.mutate(addresses);
    }

    function addVisit(_id: string, newHistory: IAddressVisit) {
        addVisitMutation.mutate({_id, visit: newHistory});
    }

    return {
        loading: isLoading || isFetching,
        error: errorString,
        addresses: addresses.filter(address => groupId ? address.groupId === groupId : true),
        addVisit,
        setAddresses
    }
}