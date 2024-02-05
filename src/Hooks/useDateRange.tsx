import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import dayjs, {Dayjs} from "dayjs";

export function useDateRange() {
    const [searchParams, setSearchParams] = useSearchParams();

    const {startDate, endDate} = useMemo(() => {
        return {
            startDate: searchParams.get('startDate'),
            endDate: searchParams.get('endDate')
        }
    }, [searchParams])

    function setStartDate(date: Dayjs | null) {
        if (date) searchParams.set('startDate', date.format('YYYY-MM-DD'))
        else searchParams.delete('startDate')
        setSearchParams(searchParams)
    }

    function setEndDate(date: Dayjs | null) {
        if (date) searchParams.set('endDate', date.format('YYYY-MM-DD'))
        else searchParams.delete('endDate')
        setSearchParams(searchParams)
    }

    return {
        startDate: startDate ? dayjs(startDate, 'YYYY-MM-DD') : null,
        endDate: endDate ? dayjs(endDate, 'YYYY-MM-DD') : null,
        setStartDate,
        setEndDate
    }
}