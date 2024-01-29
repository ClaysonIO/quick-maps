import {useGoogleSheet} from "./useGoogleSheet.ts";
import {IGeocode} from "../Interfaces/GeocodeSchema.ts";
import {GoogleSheets} from "./useProjects.ts";
import {toast} from "react-toastify";
import {useRef} from "react";

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

    const toastId = useRef<any>(null);
    async function generateGeocodesFromAddresses(addresses: string[]) {
        const geocodes: IGeocode[] = []
        if (toastId.current === null) {
            toastId.current = toast("Generating Geocodes...", {progress: 0, type: 'info'});
        }
        for (let i = 0; i < addresses.length; i++) {
            toast.update(toastId.current, {progress: i / addresses.length, });
            const address = addresses[i];
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
            geocodes.push(newGeocode);
        }
        toast.dismiss(toastId.current);
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