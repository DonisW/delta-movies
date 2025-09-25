import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CustomThemeProvider } from './context/ThemeContext.tsx'
import { CartProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CustomThemeProvider>
  <CartProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CartProvider>
  </CustomThemeProvider>
)
