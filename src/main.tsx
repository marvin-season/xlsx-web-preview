import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ExcelPreview from './ExcelPreview'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <ExcelPreview />
    </>
  </StrictMode>,
)
