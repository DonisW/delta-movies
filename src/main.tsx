import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CustomThemeProvider } from './context/ThemeContext.tsx'
import { CardProvider } from './context/CardContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CustomThemeProvider>
  <CardProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CardProvider>
  </CustomThemeProvider>
)
