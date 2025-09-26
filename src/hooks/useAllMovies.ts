import { useEffect, useState } from 'react';
import type { Movie } from '../types/Movie';
import { getAllMovies } from '../services/movieService';

export function useAllMovies(search: string) {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getAllMovies(search)
      .then((res) => setData(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [search]);

  return { data, loading, error };
}
