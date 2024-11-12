import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import useExcelSheets from './useExcelSheets'
import SheetsPreview from './SheetPreview'
const App = () => {

  const [file, setFile] = useState<Blob | null | undefined>(null);

  const { sheets } = useExcelSheets(file);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFile(file)
  }

  const loadDemo = async () => {
    const response = await fetch('/demo.xlsx')
    return response.blob()
  }

  return <>
    <button onClick={() => {
      loadDemo().then(setFile)
    }}>加载示例</button>
    <button onClick={() => {
      setFile(null)
    }}>清空</button>
    <input type="file" onChange={handleFileChange} />
    <br />
    {
      !sheets.length ? <div>no file</div> : <SheetsPreview sheets={sheets} />
    }
  </>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
