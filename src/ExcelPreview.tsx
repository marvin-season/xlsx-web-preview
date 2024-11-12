
import { FC, useState } from "react";
import "./index.css";


type Sheet = {
    name: string;
    data: any[][];
};

const SheetPreview: FC<{
    sheet: Sheet;
}> = ({ sheet }) => {
    return <>
        <table className="excel-table">
            <tbody>
                {
                    sheet.data.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={"wrap-column"} // 限制第1列的宽度
                                    >
                                        {cell || ""}
                                    </td>
                                ))}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
};


const SheetsPreview: FC<{
    sheets: Sheet[];
}> = ({ sheets }) => {

    const [activeSheetIndex, setActiveSheetIndex] = useState(0);

    return <>
        {
            sheets.map((sheet, sheetIndex) => (
                <button key={sheetIndex} onClick={() => setActiveSheetIndex(sheetIndex)}>{sheet.name}</button>
            ))
        }
        <SheetPreview key={activeSheetIndex} sheet={sheets[activeSheetIndex]} />
    </>;
};

export default SheetsPreview;
