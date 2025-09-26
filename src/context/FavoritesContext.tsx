import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type FavoritesCtxValue = {
  list: number[];
  count: number;
  toggle: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clear: () => void;
};

const FavoritesCtx = createContext<FavoritesCtxValue | null>(null);

function FavoritesProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(list));
  }, [list]);

  const toggle = useCallback((id: number) => {
    setList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isFavorite = useCallback((id: number) => list.includes(id), [list]);

  const clear = useCallback(() => setList([]), []);

  const value = useMemo(
    () => ({ list, count: list.length, toggle, isFavorite, clear }),
    [list, toggle, isFavorite, clear]
  );

  return <FavoritesCtx.Provider value={value}>{children}</FavoritesCtx.Provider>;
}

export { FavoritesCtx, FavoritesProvider };
