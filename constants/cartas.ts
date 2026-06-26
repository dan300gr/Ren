/** Posición de cada sobre en la mesa (vista galería escritorio). */
export interface EnvelopePlacement {
  id: number;
  left: string;
  top: string;
  rotate: number;
  zIndex: number;
}

export const CARTAS_COPY = {
  title: "Cartas",
  subtitle: "Cinco cartas, cinco pedacitos de mi corazón para ti.",
  subtitleHeart: "♡",
  backLabel: "Volver al inicio",
  choosePrompt: "Elige una carta",
  readerTitle: "Elige tu carta",
  readerSubtitle: "Cada carta es un recordatorio de cuánto te amo.",
  polaroidCaption: "Mi lugar favorito es a tu lado",
  notebookText: "Te elijo hoy, y siempre.",
  mobileFooterText: "Te elijo hoy, y siempre.",
  /** Fondo mesa — null usa gradiente marrón como Mensajitos/Música */
  deskBackground: "/cartas/cartas.png" as string | null,
} as const;

/** Posiciones dentro del área de sobres (% del contenedor). */
export const ENVELOPE_PLACEMENTS: EnvelopePlacement[] = [
  { id: 1, left: "13%", top: "40%", rotate: -14, zIndex: 2 },
  { id: 2, left: "29%", top: "62%", rotate: 7, zIndex: 3 },
  { id: 3, left: "47%", top: "38%", rotate: -3, zIndex: 5 },
  { id: 4, left: "63%", top: "56%", rotate: 11, zIndex: 4 },
  { id: 5, left: "79%", top: "36%", rotate: -9, zIndex: 2 },
];
