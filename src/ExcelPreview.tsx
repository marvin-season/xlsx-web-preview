import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelPreview.css"; // 引入样式文件

const ExcelTablePreview = () => {
  const [sheets, setSheets] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const allSheets = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: true });
        return { name: sheetName, data: jsonData };
      });
      setSheets(allSheets);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {sheets.map((sheet, sheetIndex) => (
        <div key={sheetIndex}>
          <h2>{sheet.name}</h2>
          <table className="excel-table">
            <tbody>
              {sheet.data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell || ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ExcelTablePreview;