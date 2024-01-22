import {useErrors} from "./useErrors.ts";
import {useUser} from "./useUser.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {GoogleSpreadsheet} from "google-spreadsheet";

export function useGoogleSheet<T>(projectId: string, sheetId: string) {

    const {addError} = useErrors();
    const {credentials} = useUser();
    const queryClient = useQueryClient();

    const {data, isLoading, isFetching} = useQuery({
        queryKey: [sheetId],
        queryFn: async () => {
            if(!credentials) return []
            const doc = new GoogleSpreadsheet(projectId, {token: credentials.access_token});
            await doc.loadInfo()
            const rows = await doc.sheetsByTitle[sheetId].getRows()
            return rows.map(row=>row.toObject()) as T[];
        },
        placeholderData: []
    })

    const updateAll = useMutation({
        mutationFn: async (newRows: (T)[]) => {
            if(!credentials) throw new Error("Not logged in")
            console.log("SHOULD UPDATE ALL ROWS", newRows)
            const doc = new GoogleSpreadsheet(projectId, {token: credentials.access_token});
            await doc.loadInfo()
            const sheet = doc.sheetsByTitle[sheetId];
            await sheet.clearRows();
            const result = await sheet.addRows(newRows as any);
            console.log("RESULT", result)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: [sheetId]});
        },
        onError: (error: any)=>{
            addError("Error setting data. Try again later. Error: " + error.message ?? "")
        }
    })

    const updateOne = useMutation({
        mutationFn: async (row: T) => {
            if(!credentials) throw new Error("Not logged in")
            const doc = new GoogleSpreadsheet(projectId, {token: credentials.access_token});
            await doc.loadInfo()
            const sheet = doc.sheetsByTitle[sheetId];
            const rows = await sheet.getRows<T>();
            const currentRow = rows.find(r=>r.id === row.id);
            if(!currentRow) throw new Error("Row not found")
            const updatedRow = Object.assign(currentRow, row);
            await updatedRow.save();
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: [sheetId]});
        },
        onError: (error)=>{
            addError("Error setting single data. Try again later. Error: " + error.message ?? "")
        }
    })

    return {
        loading: isLoading || isFetching,
        data: data ?? [],
        updateAll,
        updateOne
    }
}