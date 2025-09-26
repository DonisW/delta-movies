import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import MovieCard from '../components/catalog/MovieCard';
import { useMovies } from '../hooks/useMovies';
import { useNotify } from '../context/useNotify';
import { useFavorites } from '../context/useFavorites';
import { useAllMovies } from '../hooks/useAllMovies';

type Props = { search?: string; favoritesOnly?: boolean };

export default function CatalogPage({ search = '', favoritesOnly = false }: Props) {
  const [page, setPage] = useState(1);

  const { notify } = useNotify();
  const { list } = useFavorites();
  const inFavMode = favoritesOnly;


  const { data: movies, totalPages, loading, error } = useMovies(page, search); // Busquedad paginada

  const { data: allMovies, loading: loadingAll, error: errorAll } = useAllMovies(search); // Busquedad sin paginacion
  

  const source = inFavMode ? allMovies : movies;
  const displayed = inFavMode ? source.filter((m) => list.includes(m.id)) : source;

  const isLoading = inFavMode ? loadingAll : loading;
  const isError = inFavMode ? errorAll : error;

  useEffect(() => setPage(1), [search]);

  useEffect(() => {
    if (!isLoading && !isError && search.trim() && (movies.length === 0 || allMovies.length === 0)) {
      notify({ message: 'No se encontraron resultados para tu búsqueda', severity: 'info' });
    }
  }, [isLoading, isError, search, movies, allMovies, notify]);

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {inFavMode ? 'Tus Películas favoritas' : 'Catalogo de Películas'}
      </Typography>

      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}
      {error && <Alert severity="error">Error al cargar películas</Alert>}

      {!loading && !error && (
        <>
          {!inFavMode && totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
            />
          )}

          {/* Sin resultados */}
          {!inFavMode && !movies.length && search.trim() && (
            <Alert severity="info" sx={{ mb: 2 }}>
              No se encontraron resultados para "{search}"
            </Alert>
          )}

          { /* Sin favoritos */}
          {inFavMode && !displayed.length && (
            <Alert severity="info" sx={{ mb: 2 }}>
              No tienes películas marcadas como favoritas para esta búsqueda.
            </Alert>
          )}

          <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
            {displayed.map((movie) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {!inFavMode && totalPages > 1 && (
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