import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelTablePreview.css"; // 引入样式文件

const ExcelTablePreview = () => {
  const [sheets, setSheets] = useState([]);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

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
      setActiveSheetIndex(0); // 默认显示第一个 sheet
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {sheets.length > 0 && (
        <div>
          {/* Tab 切换按钮 */}
          <div className="tabs">
            {sheets.map((sheet, index) => (
              <button
                key={index}
                className={`tab-button ${index === activeSheetIndex ? "active" : ""}`}
                onClick={() => setActiveSheetIndex(index)}
              >
                {sheet.name}
              </button>
            ))}
          </div>

          {/* 当前激活的 sheet 表格 */}
          <table className="excel-table">
            <tbody>
              {sheets[activeSheetIndex].data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell || ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelTablePreview;