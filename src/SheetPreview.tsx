
import { FC, useMemo, useState } from "react";
import "./index.css";


type Sheet = {
    name: string;
    data: any[][];
};

const SheetPreview: FC<{
    sheet: Sheet;
}> = ({ sheet }) => {
    // sheet.data is so large, so we need to render the table dynamically.

    const [visibleRange, setVisibleRange] = useState({
        offset: 0,
        limit: 10,
    })

    const dataRows = useMemo(() => {
        return sheet.data.slice(visibleRange.offset, visibleRange.offset + visibleRange.limit)
    }, [sheet.data, visibleRange])

    return <div style={{ height: '300px', overflowY: 'scroll' }}>
        <table className="excel-table">
            <tbody>
                {
                    dataRows.map((row, rowIndex) => {
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
    </div>
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
