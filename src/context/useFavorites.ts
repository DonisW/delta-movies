import { useContext } from 'react';
import { FavoritesCtx } from './FavoritesContext';

export function useFavorites() {
  const ctx = useContext(FavoritesCtx);
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return ctx;
}
