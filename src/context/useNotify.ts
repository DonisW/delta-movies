import { useContext } from 'react';
import { NotifyCtx } from './NotifyContext';

export function useNotify() {
  const ctx = useContext(NotifyCtx);
  if (!ctx) throw new Error('useNotify debe usarse dentro de NotifyProvider');
  return ctx;
}
