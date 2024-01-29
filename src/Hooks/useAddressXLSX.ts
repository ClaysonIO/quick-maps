import XLSX from "xlsx";

export function useAddressXLSX() {

    function createTemplate() {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([
            {
                Name: 'Joseph Smith',
                Address: "865 Water St, Nauvoo, IL 62354, USA"
            },
            {
                Name: 'Emma Smith',
                Address: "865 Water St, Nauvoo, IL 62354, USA"
            },
            {
                Name: 'Newel K Whitney',
                Address: "645 Partridge St, Nauvoo, IL 62354, United States"
            },
            {
                Name: 'Orson Hyde',
                Address: "690 S Hyde St, Nauvoo, IL 62354, United States"
            },
            {
                Name: 'Marinda Hyde',
                Address: "690 S Hyde St, Nauvoo, IL 62354, United States"
            },
            {
                Name: 'Mary Ann Young',
                Address: "610 Kimball St, Nauvoo, IL 62354, United States"
            },
            {
                Name: 'Brigham Young',
                Address: "610 Kimball St, Nauvoo, IL 62354, United States"
            },
            {
                Name: 'Sally Pendleton',
                Address: "745 Kimball St, Nauvoo, IL 62354"
            },
            {
                Name: 'Calvin Pendleton',
                Address: "745 Kimball St, Nauvoo, IL 62354"
            }
        ])

        XLSX.utils.book_append_sheet(wb, ws, "Addresses")
        XLSX.writeFile(wb, "template.xlsx")
    }

    async function getAddressesFromSpreadsheet(e: any) {

        const f = e.target.files?.[0];

        const data = await f.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);

        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[]

        return json.map(((x) => ({
            id: crypto.randomUUID(),
            groupId: '',
            name: x.Name,
            address: x.Address
        })))
    }

    return {createTemplate, getAddressesFromSpreadsheet}
}