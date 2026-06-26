import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind sin conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Genera un índice aleatorio distinto al anterior. */
export function randomIndexExcluding(
  length: number,
  exclude: number | null
): number {
  if (length <= 1) return 0;
  let index: number;
  do {
    index = Math.floor(Math.random() * length);
  } while (index === exclude);
  return index;
}
