export type NavId = "inicio" | "cartas" | "musica" | "mensajitos" | "recuerdos";

export interface NavLink {
  href: string;
  label: string;
  id: NavId;
}

export interface FeatureCardData {
  id: Exclude<NavId, "inicio">;
  href: string;
  icon: "mail" | "music" | "camera" | "heart";
  title: string;
  subtitle: string;
  description: string;
  preview: "cartas" | "musica" | "recuerdos" | "mensajitos";
}

export interface Letter {
  id: number;
  sealColor: string;
  sealEmoji: string;
  title: string;
  content: string;
  envelopeColor: string;
  /** Texto corto para vista móvil */
  preview: string;
  /** Texto manuscrito en el papel */
  opening: string;
  signOff: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  spotifyUrl: string;
  story: string;
  duration: string;
  /** Mensaje corto para tarjeta del carrusel */
  shortMessage: string;
  /** Color principal del artwork */
  albumColor: string;
  albumColorSecondary: string;
}

export interface Photo {
  id: number;
  caption: string;
  backMessage: string;
  rotation: number;
  color: string;
  date: string;
  dateLong: string;
  title: string;
  story: string;
  notebookText: string;
  hasHeart?: boolean;
  placement: {
    left: string;
    top: string;
    rotate: number;
    zIndex: number;
  };
}

export type MessageRarity = "common" | "special" | "legendary";

export interface DailyMessage {
  id: number;
  text: string;
  date: string;
  rarity: MessageRarity;
}
