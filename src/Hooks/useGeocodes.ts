import {useGoogleSheet} from "./useGoogleSheet.ts";
import {IGeocode} from "../Interfaces/GeocodeSchema.ts";
import {GoogleSheets} from "./useProjects.ts";

export interface IMapTilerBatchGeocodeResponse {
    features: {
        center: [number, number]
    }[]
}

export interface IRadarBatchGeocodeResponse {
    addresses: {
        formattedAddress: string;
        latitude: number;
        longitude: number;
    }[]

}

export function useGeocodes({projectId}: { projectId: string }) {
    const {
        data,
        loading,
        updateAll,
        updateOne,
        addMultiple,
    } = useGoogleSheet<IGeocode>(projectId, GoogleSheets.SYSTEM_Geocodes)

    async function generateGeocodesFromAddresses(addresses: string[]) {
        const geocodes: IGeocode[] = []
        for (const address of addresses) {
            const parsedAddress = address.split(' ').join('+');
            const url = `https://api.radar.io/v1/geocode/forward?query=${parsedAddress}&layers=address`
            const response = await fetch(url, {headers: {"Authorization": import.meta.env.VITE_RADAR_API_KEY}});
            const json = await response.json();
            const singleAddress = json.addresses[0];

            if(!singleAddress) continue;

            const newGeocode: IGeocode = {
                id: crypto.randomUUID(),
                address,
                latitude: singleAddress.latitude,
                longitude: singleAddress.longitude
            }
console.log("GEOCODE", newGeocode)
            geocodes.push(newGeocode);
        }
        await addMultiple.mutateAsync(geocodes);
    }

    return {
        data,
        loading,
        updateAll,
        updateOne,
        generateGeocodesFromAddresses
    }
}