import {useLocalStorage} from "usehooks-ts";
import {useParams} from "react-router";
import {useResolutionTypes} from "./useResolutionTypes.ts";
import {useMergedAddresses} from "./useMergedAddresses.ts";

export function useResolutionFilters(){

    const {projectId} = useParams() as {projectId: string};

    const {data: mergedAddresses} = useMergedAddresses({projectId});
    const {data: resolutionTypes} = useResolutionTypes({projectId});

    const [filters, setFilters] = useLocalStorage<string[]>(
        'filters', resolutionTypes.map(({id})=>id));

    function toggleFilter(id: string){
        setFilters((filters)=>{
            if (filters.includes(id)){
                return filters.filter((filter)=>filter !== id)
            } else {
                return [...filters, id]
            }
        })
    }

    function filterStatus(statusId: string){
        return filters.includes(statusId)
    }

    function filterCount(statusId: string){
        return mergedAddresses.filter(address=>address.status?.id === statusId).length;
    }

    return {filters, setFilters, toggleFilter, filterStatus, filterCount}
}