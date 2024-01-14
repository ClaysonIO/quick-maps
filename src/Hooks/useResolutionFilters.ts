import {useVisitResolutions} from "./useVisitResolutions.ts";
import {useLocalStorage} from "usehooks-ts";

export function useResolutionFilters(){

    const {visitResolutions} = useVisitResolutions();

    const [filters, setFilters] = useLocalStorage<string[]>('filters', visitResolutions.map(({id})=>id));

    function toggleFilter(id: string){
        setFilters((filters)=>{
            if (filters.includes(id)){
                return filters.filter((filter)=>filter !== id)
            } else {
                return [...filters, id]
            }
        })
    }

    function filterStatus(status: string){
        return filters.includes(status)
    }

    return {filters, setFilters, toggleFilter, filterStatus}
}