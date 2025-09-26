import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import type { Movie } from '../../types/Movie';
import { useCardCtx } from '../../context/useCardCtx';

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const { add } = useCardCtx();

  return (
    <Card sx={{ maxWidth: 280, mx: 'auto', height: '100%' }}>
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
          onClick={() => add({ ...movie, quantity: 1 })}>
          Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  );
}