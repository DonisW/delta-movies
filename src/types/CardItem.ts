import type { Movie } from "./Movie";

export interface CardItem extends Movie {
  quantity: number;
}