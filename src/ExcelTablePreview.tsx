import { useState } from "react";
import * as XLSX from "xlsx";
import SheetsPreview from "./ExcelPreview";

const ExcelTablePreview = () => {
  const [sheets, setSheets] = useState<any[]>([]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as any);
      const workbook = XLSX.read(data, { type: "array" });
      const allSheets = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: "" });
        return { name: sheetName, data: jsonData };
      });
      setSheets(allSheets);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />

      {sheets.length > 0 && <SheetsPreview sheets={sheets} />}
    </div>
  );
};

export default ExcelTablePreview;