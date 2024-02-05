import {useAddresses} from "./useAddresses.ts";
import {useVisits} from "./useVisits.ts";
import {useGeocodes} from "./useGeocodes.ts";
import {useResolutionTypes} from "./useResolutionTypes.ts";
import {useMemo} from "react";

import {IMergedAddress} from "../Interfaces/MergedAddressSchema.ts";

export function useMergedAddresses({projectId, geocodeOnly}: {projectId: string, geocodeOnly?: boolean}) {
    const {data: addresses, loading: addressesLoading} = useAddresses({projectId})
    const {data: visits, loading: visitsLoading} = useVisits({projectId})
    const {data: geocodes, loading: geocodesLoading} = useGeocodes({projectId})
    const {data: resolutionTypes, loading: resolutionTypesLoading} = useResolutionTypes({projectId})

    const data = useMemo<IMergedAddress[]>(()=>{
        const uniqueAddresses = Array.from(new Set(addresses.map(x=>x.address)));

        return uniqueAddresses.map(address=>{

            const occupants = addresses
                .filter(x=>x.address === address)
            const visitsAtLocation = visits
                .filter(x=>x.address === address)
                .sort((a,b)=>a.dateTime.getTime() - b.dateTime.getTime());
            const geocodeForLocation = geocodes
                .find(x=>x.address === address)

            const currentVisit = visitsAtLocation.slice().pop()

            const resolutionType = resolutionTypes
                .find(x=>x.id === (currentVisit?.resolutionId ?? 'undefined'))

            const mergedAddress: IMergedAddress = {
                id: crypto.randomUUID(),
                address: occupants[0].address,
                occupants,
                geocode: geocodeForLocation,
                visits: visitsAtLocation,
                status: resolutionType

            }
            return mergedAddress;
        })
    }, [addresses, visits, geocodes, resolutionTypes])

    return {
        data: data.filter(x=>geocodeOnly ? x.geocode : true),
        loading : addressesLoading || visitsLoading || geocodesLoading || resolutionTypesLoading,
    }
}