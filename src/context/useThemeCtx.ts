import { useContext } from 'react';
import { ThemeCtx } from './ThemeContext';

export const useThemeCtx = () => useContext(ThemeCtx);