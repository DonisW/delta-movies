import { Card, CardMedia, CardContent, Typography, Button, CardActions, IconButton, Tooltip } from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import type { Movie } from '../../types/Movie';
import { useCardCtx } from '../../context/useCardCtx';
import { useNotify } from '../../context/useNotify';
import { useFavorites } from '../../context/useFavorites';

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const { add } = useCardCtx();
  const { notify } = useNotify();
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  return (
    <Card sx={{ maxWidth: 280, mx: 'auto', height: '100%', position: 'relative' }}>
      <Tooltip title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
        <IconButton onClick={() => { toggle(movie.id); notify({ message: fav ? `“${movie.title}” removida de favoritos` : `“${movie.title}” agregada a favoritos`, severity: fav ? 'warning' : 'success' }); }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            color: 'red',
            '&:hover': { color: 'primary.dark' },
            '&:focus-visible': { color: 'primary.light' },
            boxShadow: 5,
          }}>
          {fav ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>
      <CardMedia component="img" height={400} image={movie.poster} alt={movie.title} />
      <CardContent>
        <Typography variant="h6" noWrap title={movie.title}>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 44 }}>
          {movie.description.slice(0, 80)}…
        </Typography>
        <Typography sx={{ mt: 1 }} variant="h6" color="primary">
          ${movie.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" startIcon={<AddShoppingCart />}
          onClick={() => { add({ ...movie, quantity: 1 }); notify({ message: `“${movie.title}” agregada al carrito`, severity: 'success' }); }}>
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  );
}