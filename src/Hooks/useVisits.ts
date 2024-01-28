import {useGoogleSheet} from "./useGoogleSheet.ts";
import {GoogleSheets} from "./useProjects.ts";
import {IVisit, VisitSchema} from "../Interfaces/VisitSchema.ts";

export function useVisits({projectId}: {projectId: string }) {
    const {
        data,
        loading,
        updateAll,
        updateOne
    } = useGoogleSheet<IVisit>(projectId, GoogleSheets.SYSTEM_Visits)

    return {
        data: data.map(x=>(VisitSchema.parse(x))),
        loading,
        updateAll,
        updateOne
    }
}