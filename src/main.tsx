import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CustomThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CustomThemeProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CustomThemeProvider>
)
