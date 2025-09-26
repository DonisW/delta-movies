import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CustomThemeProvider } from './context/ThemeContext.tsx'
import { CardProvider } from './context/CardContext.tsx'
import { NotifyProvider } from './context/NotifyContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CustomThemeProvider>
  <CardProvider>
  <NotifyProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </NotifyProvider>
  </CardProvider>
  </CustomThemeProvider>
)
