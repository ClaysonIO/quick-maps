import {useGoogleSheet} from "./useGoogleSheet.ts";
import {GoogleSheets} from "./useProjects.ts";

export interface IGroup {
    _id: string;
    name: string;
    className: string;
}

export function useGroups({projectId}: {projectId: string }) {
    const {
        data,
        loading,
        updateAll,
        updateOne
    } = useGoogleSheet<IGroup>(projectId, GoogleSheets.SYSTEM_Groups)

    return {
        data,
        loading,
        updateAll,
        updateOne
    }
}