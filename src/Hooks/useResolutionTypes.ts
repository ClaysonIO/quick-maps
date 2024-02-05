import {useGoogleSheet} from "./useGoogleSheet.ts";
import {GoogleSheets} from "./useProjects.ts";
import {IResolutionType} from "../Interfaces/ResolutionTypeSchema.ts";

export function useResolutionTypes({projectId}: {projectId: string }) {
    const {
        data,
        loading,
        updateAll,
        updateOne
    } = useGoogleSheet<IResolutionType>(projectId, GoogleSheets.SYSTEM_ResolutionTypes)

    return {
        data: data.concat([{id: 'undefined', name: 'No Visits Recorded', color: 'rgba(0,0,0,.2)', description: 'No visits recorded.'}]),
        loading,
        updateAll,
        updateOne
    }
}