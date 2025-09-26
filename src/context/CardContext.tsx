import { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CardItem } from '../types/CardItem';

type CardState = { items: CardItem[]; isOpen: boolean };
type CardAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'ADD'; movie: CardItem } // Aggregar o aumentar cantidad
  | { type: 'REMOVE'; id: number } // Disminuir cantidad o eliminar
  | { type: 'CLEARONEMOVIE'; id: number } // Eliminar completamente una pelicula del carrito
  | { type: 'CLEAR' }; // Vaciar carrito

const CardCtx = createContext<{
  state: CardState;
  open: () => void;
  close: () => void;
  add: (m: CardItem) => void;
  remove: (id: number) => void;
  clearOneMovie: (id: number) => void;
  clear: () => void;
  totalQty: number;
  totalPrice: number;
} | null>(null);

const cardReducer = (movies: CardState, action: CardAction): CardState => {
  switch (action.type) {
    case 'OPEN':
      return { ...movies, isOpen: true };
    case 'CLOSE':
      return { ...movies, isOpen: false };
    case 'ADD': {
      const exist = movies.items.find((x) => x.id === action.movie.id);
      if (exist) {
        return {
          ...movies,
          items: movies.items.map((x) =>
            x.id === action.movie.id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      }
      return { ...movies, items: [...movies.items, { ...action.movie, quantity: 1 }] };
    }
    case 'REMOVE': {
      const exist = movies.items.find((x) => x.id === action.id);
      if (!exist) return movies;
      if (exist.quantity === 1) {
        return { ...movies, items: movies.items.filter((x) => x.id !== action.id) };
      }
      return {
        ...movies,
        items: movies.items.map((x) =>
          x.id === action.id ? { ...x, quantity: x.quantity - 1 } : x
        ),
      };
    }
    case 'CLEARONEMOVIE': { 
        const existe = movies.items.filter((x) => x.id !== action.id)
        return { ...movies, items: existe };
      };
    case 'CLEAR':
      return { ...movies, items: [] };
    default:
      return movies;
  }
};

const initial: CardState = { items: [], isOpen: false };

const CardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardReducer, initial, () => {
    try {
      const raw = localStorage.getItem('card');
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem('card', JSON.stringify(state));
  }, [state]);

  const totalQty = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.quantity * i.price, 0);

  const api = {
    state,
    open: () => dispatch({ type: 'OPEN' }),
    close: () => dispatch({ type: 'CLOSE' }),
    add: (movie: CardItem) => dispatch({ type: 'ADD', movie }),
    remove: (id: number) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    clearOneMovie: (id: number) => dispatch({ type: 'CLEARONEMOVIE', id }),
    totalQty,
    totalPrice,
  };

  return <CardCtx.Provider value={api}>{children}</CardCtx.Provider>;
};

export { CardCtx, CardProvider };