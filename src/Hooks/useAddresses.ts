import {IAddress} from "../Interfaces/AddressSchema.ts";
import {useGoogleSheet} from "./useGoogleSheet.ts";

export function useAddresses({projectId, groupId}: {projectId: string, groupId?: string
}) {
    const {data, loading, updateAll, updateOne } = useGoogleSheet<IAddress>(projectId, 'SYSTEM_Addresses')

    return {
        data: groupId ? data.filter(x=>x.groupId === groupId) : data,
        loading,
        updateAll,
        updateOne
    }
}