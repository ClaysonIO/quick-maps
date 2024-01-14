import {useVisitResolutions} from "./useVisitResolutions.ts";
import {useLocalStorage} from "usehooks-ts";
import {useAddresses} from "./useAddresses.ts";

export function useResolutionFilters(){

    const {visitResolutions} = useVisitResolutions();
    const {addresses} = useAddresses();

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

    function filterCount(status: string){
        return addresses.filter(address=>address.status === status).length;
    }

    return {filters, setFilters, toggleFilter, filterStatus, filterCount}
}