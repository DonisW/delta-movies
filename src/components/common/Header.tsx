import {
  AppBar, Toolbar, Typography, TextField, IconButton, Badge
} from '@mui/material';
import { Brightness4, Brightness7, ShoppingCart } from '@mui/icons-material';
import { useThemeCtx } from '../../context/useThemeCtx';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useCardCtx } from '../../context/useCardCtx';

type Props = { onSearch: (q: string) => void };

export default function Header({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 300);
  const { toggle, isDark } = useThemeCtx();
  const { open, totalQty } = useCardCtx();

  useEffect(() => onSearch(debounced), [debounced, onSearch]);

  return (
    <AppBar position="sticky" sx={{ width: '100vw', top: 0, left: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Delta Movies
        </Typography>

        {/* Búsqueda */}
        <TextField
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          sx={{ width: 220, mr: 2, backgroundColor: 'background.paper', borderRadius: 1 }}
        />

        {/* Modo oscuro */}
        <IconButton color="inherit" onClick={toggle}>
            {isDark ? <Brightness4 /> : <Brightness7 />}
        </IconButton>

        {/* Carrito */}
        <IconButton color="inherit" onClick={open}>
          <Badge badgeContent={totalQty} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}