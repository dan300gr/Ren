import type { FeatureCardData, NavLink } from "@/types";

export const SITE_TITLE = "Para Ren";
export const SITE_DESCRIPTION =
  "Un pequeño refugio hecho con todo mi amor, para que siempre tengas un lugar donde volver.";

export const WELCOME = {
  headline:
    "Para que siempre recuerdes que te amo, en cualquier momento del día.",
  headlineHighlights: ["siempre", "te amo"] as const,
  subtext:
    "Este pequeño rincón existe para que siempre tengas un lugar donde volver cuando quieras sonreír. ♡",
  subtextHighlight: "sonreír",
  cta: "Entrar ♡",
  storageKey: "ren-welcome-seen",
} as const;

/** Activar cuando la sección Nosotras esté lista para publicar. */
export const SHOW_NOSOTRAS_SECTION = false;

const ALL_NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio", id: "inicio" },
  { href: "/cartas", label: "Cartas", id: "cartas" },
  { href: "/musica", label: "Música", id: "musica" },
  { href: "/nosotros", label: "Nosotras", id: "nosotros" },
  { href: "/mensajitos", label: "Mensajitos", id: "mensajito" },
];

export const NAV_LINKS = SHOW_NOSOTRAS_SECTION
  ? ALL_NAV_LINKS
  : ALL_NAV_LINKS.filter((link) => link.id !== "nosotros");

const ALL_FEATURE_CARDS: FeatureCardData[] = [
  {
    href: "/cartas",
    icon: "mail",
    title: "Cartas",
    subtitle: "5 cartas para ti",
    description: "Ábrelas cuando necesites una razón para sonreír.",
    preview: "cartas",
  },
  {
    href: "/musica",
    icon: "music",
    title: "Nuestra música",
    subtitle: "Las canciones que me recuerdan a ti",
    description: "Cada canción tiene una historia que contar.",
    preview: "musica",
  },
  {
    href: "/nosotros",
    icon: "camera",
    title: "Nosotras",
    subtitle: "Nuestros momentos favoritos",
    description: "Pequeños recuerdos, grandes historias.",
    preview: "nosotros",
  },
  {
    href: "/mensajitos",
    icon: "heart",
    title: "Un mensajito",
    subtitle: "Algo lindo para ti",
    description: "Cada día, un mensaje solo para ti.",
    preview: "mensajito",
  },
];

export const FEATURE_CARDS = SHOW_NOSOTRAS_SECTION
  ? ALL_FEATURE_CARDS
  : ALL_FEATURE_CARDS.filter((card) => card.preview !== "nosotros");

/** Contenedor exterior/interior — misma paleta que el inicio. */
export const LIGHT_SHELL = {
  outer:
    "min-h-screen p-3 md:p-5 lg:p-6 flex items-stretch bg-white",
  inner:
    "flex w-full max-w-[1400px] mx-auto overflow-hidden rounded-[28px] md:rounded-[32px] border border-rose-200/50 shadow-xl shadow-rose-900/[0.04] bg-white min-h-[calc(100dvh-1.5rem)] md:min-h-[calc(100dvh-2.5rem)] lg:min-h-[calc(100dvh-3rem)] lg:max-h-[calc(100dvh-3rem)]",
} as const;

export const HERO = {
  headline: "Para que siempre recuerdes que te amo, en cualquier momento del día.",
  highlight: "siempre",
  glassText:
    "Este es un pequeño rincón hecho con todo mi amor para ti. Porque tú eres mi lugar favorito. ♡",
  scrollHint: "Desliza para descubrir",
  /** Ruta de imagen de fondo — null = blanco temporal */
  backgroundImage: "/cartas/WhatsApp Image 2026-06-26 at 16.21.58.jpeg" as string | null,
} as const;
