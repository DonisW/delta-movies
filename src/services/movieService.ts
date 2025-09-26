import movies from '../data/movies.json';
import type { Movie } from '../types/Movie';

const PAGE_SIZE = 8;

type Res = { movies: Movie[]; totalPages: number };

export async function getMovies(page = 1, search = ''): Promise<Res> {
  // Filtrar
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  // Paginar
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const offset = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(offset, offset + PAGE_SIZE);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ movies: paged, totalPages }), 400);
  });
}

export async function getAllMovies(search = ''): Promise<Movie[]> {
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );
  return new Promise((resolve) => {
    setTimeout(() => resolve(filtered), 300);
  });
}