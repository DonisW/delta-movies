import { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import type { Movie } from '../types/Movie';

export function useMovies(page: number, search: string) {
  const [data, setData] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getMovies(page, search)
      .then((res) => {
        setData(res.movies);
        setTotalPages(res.totalPages);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [page, search]);

  return { data, totalPages, loading, error };
}