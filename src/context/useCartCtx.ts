import { useContext } from 'react';
import { CartCtx } from './CartContext';

export const useCartCtx = () => {
    const ctx = useContext(CartCtx);
    if (!ctx) throw new Error('useCart fuera de CartProvider');
    return ctx;
};
