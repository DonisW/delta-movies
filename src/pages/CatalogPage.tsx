import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MovieCard from '../components/catalog/MovieCard';
import movies from '../data/movies.json';

type Props = { search?: string };

export default function CatalogPage({ search = '' }: Props) {

    // const { data, totalPages, loading, error } = useMovies(page, search);

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
      Catálogo de películas
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
        {movies.map((movie) => (
          <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}