import { useCallback, useEffect, useState } from "react"
import * as XLSX from "xlsx";

const useExcelSheets = (file: Blob | null | undefined) => {
    const [sheets, setSheets] = useState<any[]>([]);

    const extractSheets = useCallback(async () => {
        if (!file) {
            setSheets([])
            return
        }

        const arrayBuffer = await file.arrayBuffer()
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
        const allSheets = workbook.SheetNames.map((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: "" });
            return { name: sheetName, data: jsonData };
        });
        setSheets(allSheets)
    }, [file])


    useEffect(() => {
        extractSheets()
    }, [file])

    return {
        sheets,
    }

}

export default useExcelSheets