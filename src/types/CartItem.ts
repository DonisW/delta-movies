import type { Movie } from "./Movie";

export interface CartItem extends Movie {
  quantity: number;
}