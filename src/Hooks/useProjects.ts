import {useUser} from "./useUser.ts";
import {GoogleSpreadsheet} from "google-spreadsheet";
import {useLocalStorage} from "usehooks-ts";
import {useState} from "react";

interface IProject {
    id: string;
    name: string;
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
                const system_addresses = await newDoc.addSheet({title: 'SYSTEM_Addresses'})
                const system_geocodes = await newDoc.addSheet({title: 'SYSTEM_Geocodes'})
                const system_visits = await newDoc.addSheet({title: 'SYSTEM_Visits'})
                const system_resolutionTypes = await newDoc.addSheet({title: 'SYSTEM_ResolutionTypes'})
                const system_groups = await newDoc.addSheet({title: 'SYSTEM_Groups'})

                // Add columns
                setStatus('Adding headers to sheets...')
                await system_geocodes.setHeaderRow(['id', 'address', 'latitude', 'longitude'])
                await system_visits.setHeaderRow(['id', 'address', 'datetime', 'resolution', 'email', 'notes'])
                await system_resolutionTypes.setHeaderRow(['id', 'resolution', 'description'])
                await system_groups.setHeaderRow(['id', 'name', 'description'])
                await system_addresses.setHeaderRow(['id', 'address', 'name', 'groupId'])

                setStatus('Adding default resolutions...')
                await system_resolutionTypes.addRows([
                    ['not-visited', 'Not Visited', 'Address has not been visited'],
                    ['address-correct', 'Address Correct', 'Address is correct'],
                    ['not-resolved', 'Not Resolved', 'Address is not resolved'],
                    ['no-answer', 'No Answer', 'Address did not answer'],
                    ['no-access', 'No Access', 'Address was not accessible'],
                    ['moved', 'Moved', 'Address has moved'],
                    ['deceased', 'Deceased', 'Address is deceased'],
                    ['other', 'Other', 'Other'],
                    ['complete', 'Complete', 'This address has been fully processed, and is ready to be removed from the list.'],
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