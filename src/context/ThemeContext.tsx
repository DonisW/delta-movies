import { createContext, useEffect, useState } from 'react';
import { ThemeProvider as MuiProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type { ReactNode } from 'react';

const light = createTheme({ palette: { mode: 'light' } });
const dark = createTheme({ palette: { mode: 'dark' } });

type Ctx = { toggle: () => void; isDark: boolean };
const ThemeCtx = createContext<Ctx>({ toggle: () => {}, isDark: false });

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ toggle: () => setIsDark((v) => !v), isDark }}>
      <MuiProvider theme={isDark ? dark : light}>
        <CssBaseline />
        {children}
      </MuiProvider>
    </ThemeCtx.Provider>
  );
};

export { ThemeCtx, CustomThemeProvider };