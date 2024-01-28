import {useUser} from "./useUser.ts";
import {GoogleSpreadsheet} from "google-spreadsheet";
import {useLocalStorage} from "usehooks-ts";
import {useState} from "react";
import {GeocodeSchema} from "../Interfaces/GeocodeSchema.ts";
import {VisitSchema} from "../Interfaces/VisitSchema.ts";
import {ResolutionTypeSchema} from "../Interfaces/ResolutionTypeSchema.ts";
import {GroupSchema} from "../Interfaces/GroupSchema.ts";
import {AddressSchema} from "../Interfaces/AddressSchema.ts";

export interface IProject {
    id: string;
    name: string;
}

export enum GoogleSheets {
    SYSTEM_Addresses = "SYSTEM_Addresses",
    SYSTEM_Geocodes = "SYSTEM_Geocodes",
    SYSTEM_Visits = "SYSTEM_Visits",
    SYSTEM_ResolutionTypes = "SYSTEM_ResolutionTypes",
    SYSTEM_Groups = "SYSTEM_Groups",
}

export function useProjects() {
    const {credentials} = useUser();
    const [projects, setProjects] = useLocalStorage<IProject[]>('projects', []);
    const [status, setStatus] = useState<string>('');

    async function create(name: string) {
        if (credentials) {
            try {
                setStatus('Creating spreadsheet...')
                const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument({token: credentials.access_token}, {title: name})
                // Add sheets
                setStatus('Adding sheets...')
                const system_addresses = await newDoc.addSheet({title: GoogleSheets.SYSTEM_Addresses})
                const system_geocodes = await newDoc.addSheet({title: GoogleSheets.SYSTEM_Geocodes})
                const system_visits = await newDoc.addSheet({title: GoogleSheets.SYSTEM_Visits})
                const system_resolutionTypes = await newDoc.addSheet({title: GoogleSheets.SYSTEM_ResolutionTypes})
                const system_groups = await newDoc.addSheet({title: GoogleSheets.SYSTEM_Groups})

                // Add columns
                setStatus('Adding headers to sheets...')
                await system_geocodes.setHeaderRow(Object.keys(GeocodeSchema.shape))
                await system_visits.setHeaderRow(Object.keys(VisitSchema.shape))
                await system_resolutionTypes.setHeaderRow(Object.keys(ResolutionTypeSchema.shape))
                await system_groups.setHeaderRow(Object.keys(GroupSchema.shape))
                await system_addresses.setHeaderRow(Object.keys(AddressSchema.shape))

                setStatus('Adding default resolutions...')
                await system_resolutionTypes.addRows([
                    ['not-visited', '#ffffff', 'Not Visited', 'Address has not been visited'],
                    ['address-correct', '#31ff00', 'Address Correct', 'Address is correct'],
                    ['not-resolved', '#0051ff', 'Not Resolved', 'Address is not resolved'],
                    ['no-answer', '#ffcc00', 'No Answer', 'Address did not answer'],
                    ['no-access', '#a20095', 'No Access', 'Address was not accessible'],
                    ['moved', '#ff0000', 'Moved', 'Address has moved'],
                    ['deceased', '#000000', 'Deceased', 'Address is deceased'],
                    ['other', '#8f8f8f', 'Other', 'Other'],
                    ['complete', '#00fff7', 'Complete', 'This address has been fully processed, and is ready to be removed from the list.'],
                ]);

                const newProject = {id: newDoc.spreadsheetId, name}
                setProjects([...projects, newProject])
                return newProject
            } catch (e) {
                console.error(e);
            }
        }
    }

    return {data: projects, create, status}
}