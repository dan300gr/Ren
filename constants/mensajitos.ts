export const MENSAJITOS_COPY = {
  title: "Mensajito del día",
  subtitle: "Un pequeño recordatorio de cuánto",
  subtitleHighlight: "te amo",
  subtitleEnd: ".",
  refreshLabel: "Otro mensajito",
  dailyFooter: "Cada día, uno nuevo para ti.",
  savedWidget: "mensajitos que atesoro",
  savedPrefix: "Guardados:",
  previousTitle: "Mensajitos anteriores",
  savedTitle: "Mensajitos guardados",
  savedSubtitle: "Los que quiero releer siempre.",
  viewAll: "Ver todas",
  saveLabel: "Guardar",
  savedListTitle: "Guardados",
  stickyNote: "Gracias por existir...",
  polaroidCaption: "Tú y yo, siempre",
  /** Fondo mesa escritorio */
  deskBackground: null as string | null,
} as const;

export const SAVED_STORAGE_KEY = "ren-saved-mensajitos";
export const LAST_MESSAGE_ID_KEY = "ren-last-mensajito-id";
export const SEEN_MESSAGE_IDS_KEY = "ren-seen-mensajito-ids";
export const LEGENDARY_DATE_KEY = "ren-last-legendary-mensajito";

/** Días mínimos entre mensajes muy especiales. */
export const LEGENDARY_COOLDOWN_DAYS = 7;
