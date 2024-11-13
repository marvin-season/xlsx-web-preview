
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
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
        limit: 30,
    });

    const lastScrollTopRef = useRef(-1);

    const dataRows = useMemo(() => {
        return sheet.data.map((item, index) => ({ ...item, __v_id: index })).slice(visibleRange.offset, visibleRange.offset + visibleRange.limit)
    }, [sheet.data, visibleRange])

    useEffect(() => {
        console.log({ dataRows });
    }, [dataRows])

    return <div style={{ height: '300px', overflowY: 'scroll' }} onScroll={(e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLDivElement;
        if (scrollTop > lastScrollTopRef.current) {
            // 向下滚动
            console.log('scroll to bottom', scrollTop, clientHeight, scrollHeight);
            // 底部还剩一页时，加载更多数据
            if (scrollHeight - (scrollTop + clientHeight) <= clientHeight && visibleRange.offset + visibleRange.limit < sheet.data.length) {
                setVisibleRange(prev => ({
                    offset: prev.offset + 10,
                    limit: prev.limit,
                }))
            }
        } else if (scrollTop < lastScrollTopRef.current) {
            // 向上滚动
            console.log('scroll to top', scrollTop, clientHeight, scrollHeight);
            // 顶部还剩一页时，加载更多数据
            if (scrollTop <= clientHeight && visibleRange.offset > 0) {
                const offset = visibleRange.offset - 10;
                setVisibleRange(prev => ({
                    offset: offset < 0 ? 0 : offset,
                    limit: prev.limit,
                }))
            }
        }
        lastScrollTopRef.current = scrollTop;
    }}>
        <table className="excel-table" >
            <tbody>
                {
                    dataRows.map((row) => {
                        return (
                            <tr key={row.__v_id}>
                                {
                                    Object.entries(row).map(([key, value]) => (
                                        key === '__v_id' ? null : <td key={key} className={"wrap-column"}>{value as ReactNode}</td>
                                    ))
                                }
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
