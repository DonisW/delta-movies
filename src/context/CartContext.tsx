import { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types/CartItem';

type CartState = { items: CartItem[]; isOpen: boolean };
type CartAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'ADD'; movie: CartItem }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEARONEMOVIE'; id: number }
  | { type: 'CLEAR' };

const CartCtx = createContext<{
  state: CartState;
  open: () => void;
  close: () => void;
  add: (m: CartItem) => void;
  remove: (id: number) => void;
  clearOneMovie: (id: number) => void;
  clear: () => void;
  totalQty: number;
  totalPrice: number;
} | null>(null);

const cartReducer = (movies: CartState, action: CartAction): CartState => {
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
        console.log('clear one movie',{ action: action, movies: movies})
        const existe = movies.items.filter((x) => x.id !== action.id)
        return { ...movies, items: existe };
      };
    case 'CLEAR':
      return { ...movies, items: [] };
    default:
      return movies;
  }
};

const initial: CartState = { items: [], isOpen: false };

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initial, () => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const totalQty = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.quantity * i.price, 0);

  const api = {
    state,
    open: () => dispatch({ type: 'OPEN' }),
    close: () => dispatch({ type: 'CLOSE' }),
    add: (movie: CartItem) => dispatch({ type: 'ADD', movie }),
    remove: (id: number) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    clearOneMovie: (id: number) => dispatch({ type: 'CLEARONEMOVIE', id }),
    totalQty,
    totalPrice,
  };

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
};

export { CartCtx, CartProvider };