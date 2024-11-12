import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ExcelTablePreview from './ExcelTablePreview'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <ExcelTablePreview />
    </>
  </StrictMode>,
)
