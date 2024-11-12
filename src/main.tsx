import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import useExcelSheets from './useExcelSheets'
import SheetsPreview from './SheetPreview'
const App = () => {
  const { sheets } = useExcelSheets('/demo.xlsx')
  if (!sheets.length) return null
  return <SheetsPreview sheets={sheets} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
