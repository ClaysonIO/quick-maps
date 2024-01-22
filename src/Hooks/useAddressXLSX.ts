import XLSX from "xlsx";

export function useAddressXLSX(){

    function createTemplate(){
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([
            {
            Name: 'Joseph Smith',
            Address: "865 Water St, Nauvoo, IL 62354, USA"
        },{
            Name: 'Nauvoo Temple',
            Address: "50 N Wells St Nauvoo IL 62354 United States"
        },{
            Name: 'Webb Brothers Blacksmith Shop',
            Address: "585 Parley St, Nauvoo, IL 62354, United States"
        }
        ])

        XLSX.utils.book_append_sheet(wb, ws, "Addresses")
        XLSX.writeFile(wb, "template.xlsx")
    }

    async function getAddressesFromSpreadsheet(e: any){

            const f = e.target.files?.[0];

            const data = await f.arrayBuffer();
            /* data is an ArrayBuffer */
            const workbook = XLSX.read(data);

            const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[]

            return json.map(((x)=>({
                id: crypto.randomUUID(),
                groupId: '',
                name: x.Name,
                address: x.Address
            })))
    }

    return {createTemplate, getAddressesFromSpreadsheet}
}