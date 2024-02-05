import {useGoogleSheet} from "./useGoogleSheet.ts";
import {GoogleSheets} from "./useProjects.ts";
import {IVisit, VisitSchema} from "../Interfaces/VisitSchema.ts";
import {useMemo} from "react";
import dayjs from "dayjs";
import {useDateRange} from "./useDateRange.tsx";

export function useVisits({projectId}: {projectId: string }) {

    const {startDate, endDate} = useDateRange()

    const {
        data,
        loading,
        updateAll,
        updateOne,
        addMultiple
    } = useGoogleSheet<IVisit>(projectId, GoogleSheets.SYSTEM_Visits)


    const filteredDate = useMemo(()=>{
        return data.filter(x=>{
            if(!x.dateTime) return false
            const date = dayjs(x.dateTime)
            if(startDate && date.isBefore(startDate)) return false
            if(endDate && date.isAfter(endDate)) return false
            return true
        })


    }, [startDate, endDate, data])

    return {
        data: filteredDate.map(x=>(VisitSchema.parse(x))),
        loading,
        updateAll,
        updateOne,
        addMultiple
    }
}