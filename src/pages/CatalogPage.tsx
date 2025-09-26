import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import MovieCard from '../components/catalog/MovieCard';
import { useMovies } from '../hooks/useMovies';

type Props = { search?: string };

export default function CatalogPage({ search = '' }: Props) {
  const [page, setPage] = useState(1);
  const { data: movies, totalPages, loading, error } = useMovies(page, search);

  useEffect(() => setPage(1), [search]);

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Catalogo de Películas
      </Typography>

      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}
      {error && <Alert severity="error">Error al cargar películas</Alert>}

      {!loading && !error && (
        <>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
            />
          )}

          <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
            {movies.map((movie) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
            />
          )}
        </>
      )}
    </Container>
  );
}