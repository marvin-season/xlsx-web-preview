import { useEffect, useState } from "react"
import * as XLSX from "xlsx";

const useExcelSheets = (excelUrl: string) => {
    const [sheets, setSheets] = useState<any[]>([])
    const handleExcel = async () => {
        console.log('useExcel')
        const response = await fetch(excelUrl)
        const arrayBuffer = await response.arrayBuffer()

        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
        const allSheets = workbook.SheetNames.map((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: "" });
            return { name: sheetName, data: jsonData };
        });
        setSheets(allSheets)
    }


    useEffect(() => {
        handleExcel()
    }, [])

    return {
        sheets
    }

}

export default useExcelSheets