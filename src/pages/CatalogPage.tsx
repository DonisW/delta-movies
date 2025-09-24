import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MovieCard from '../components/catalog/MovieCard';
import movies from '../data/movies.json';

export default function CatalogPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Catálogo de películas
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}