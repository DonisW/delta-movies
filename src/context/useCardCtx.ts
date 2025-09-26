import { useContext } from 'react';
import { CardCtx } from './CardContext';

export const useCardCtx = () => {
    const ctx = useContext(CardCtx);
    if (!ctx) throw new Error('useCart fuera de CartProvider');
    return ctx;
};
