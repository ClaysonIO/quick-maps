import {VisitResolution} from "../../netlify/functions/Types/AddressSchema.ts";

export function useVisitResolutions(){
    const visitResolutions: {name: string, id: VisitResolution, color: string}[] = [
        {name: 'Address Correct', id: 'address-correct', color: '#31ff00'},
        {name: 'Not Resolved', id: 'not-resolved', color: '#0051ff'},
        {name: 'No Answer', id: 'no-answer', color: '#ffcc00'},
        {name: 'No Access', id: 'no-access', color: '#a20095'},
        {name: 'Moved', id: 'moved', color: '#ff0000'},
        {name: 'Deceased', id: 'deceased', color: '#000000'},
        {name: 'Other', id: 'other', color: '#FFFFFF'},
        {name: 'Moved to List', id: 'moved-to-list', color: '#FFFFFF'},
    ]
    
    function getName(id: VisitResolution){
        switch (id) {
            case 'not-visited' : return 'Not Visited';
            case 'address-correct': return 'Address Correct';
            case 'not-resolved': return 'Not Resolved';
            case 'no-answer': return 'No Answer';
            case 'no-access': return 'No Access';
            case 'moved': return 'Moved';
            case 'deceased': return 'Deceased';
            case 'other': return 'Other';
            case 'moved-to-list': return 'Moved to List';
            default: return "Not Valid";
        }
    }
    
    return {visitResolutions, getName}
}