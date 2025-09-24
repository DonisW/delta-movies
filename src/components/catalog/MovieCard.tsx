import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import type { Movie } from '../../types/Movie';

type Props = {
  movie: Movie;
//   onAddToCart: (movie: Movie) => void;
};

export default function MovieCard({ movie }: Props) {
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
        <Button fullWidth variant="contained" startIcon={<AddShoppingCart />}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}