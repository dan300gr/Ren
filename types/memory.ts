export type MemoryCategory =
  | "citas"
  | "dias-especiales"
  | "cotidiano"
  | "aventuras";

export interface Memory {
  id: string;
  slug: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  note?: string;
  date?: string;
  location?: string;
  category?: MemoryCategory;
  favorite?: boolean;
  objectPosition?: string;
}
