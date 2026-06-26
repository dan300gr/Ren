import type { Song } from "@/types";

export const songs: Song[] = [
  {
    id: 1,
    title: "Ahí Estabas Tú",
    artist: "Carín León",
    spotifyUrl: "https://open.spotify.com/track/3hwtMoZGYylPlecZGAdW6y",
    duration: "3:28",
    shortMessage:
      "La primera canción que te mandé, sin pensarlo dos veces.",
    albumColor: "#C9A882",
    albumColorSecondary: "#8B6B4A",
    story:
      "Esta fue la primera canción que te mandé, sin pensarlo dos veces. Te vi y, desde ese instante, supe que eras todo lo que siempre había buscado. Como dice Carín, quiero cuidar tu corazón para siempre.",
  },
  {
    id: 2,
    title: "The Prophecy",
    artist: "Taylor Swift",
    spotifyUrl: "https://open.spotify.com/track/18WFFUIsewmA8g31KAeo3e",
    duration: "4:09",
    shortMessage: "Un augurio convertido en canción.",
    albumColor: "#B8B0A8",
    albumColorSecondary: "#8A8278",
    story:
      "Un augurio convertido en canción. Era mi forma de suplicar que fueras tú la indicada. Y, amor, sí eras tú: estabas presente en cada una de mis plegarias, incluso antes de saber que algún día llegarías a mi vida.",
  },
  {
    id: 3,
    title: "¿Dónde Estabas Tú?",
    artist: "Danna Paola",
    spotifyUrl: "https://open.spotify.com/track/1PyINqIUN9HFVrmhBACtBz",
    duration: "4:04",
    shortMessage: "La canción del coche camino al helado.",
    albumColor: "#C4A8B8",
    albumColorSecondary: "#9A7888",
    story:
      "La canción que cantábamos en el coche mientras íbamos por un helado. Y no hay frase que me represente más que esa que pregunta: \"¿Dónde habías estado todo este tiempo?\" Porque, después de encontrarte, entendí que llevaba toda la vida esperándote.",
  },
  {
    id: 4,
    title: "Amarte es un placer",
    artist: "Luis Miguel",
    spotifyUrl: "https://open.spotify.com/track/4lQWZGUrquRfH9se6nlmp3",
    duration: "3:31",
    shortMessage: "Es un placer amarte día con día.",
    albumColor: "#D4C4A8",
    albumColorSecondary: "#A89470",
    story:
      "Es un placer amarte día con día. Cada momento contigo confirma que no podría pedirle más a la vida. Eres mi lugar favorito y mi decisión más bonita.",
  },
  {
    id: 5,
    title: "Lifetime",
    artist: "Justin Bieber",
    spotifyUrl: "https://open.spotify.com/track/3kZLeZr4StCy1tlOBRJrUH",
    duration: "3:27",
    shortMessage: "Contigo quiero que esto dure toda una vida.",
    albumColor: "#A8C4D4",
    albumColorSecondary: "#6E94A8",
    story:
      "Contigo quiero que esto dure. No solo una temporada, ni unos cuantos años, sino toda una vida. Y esta canción... no tienes idea de lo importante que es para mí. Así que guárdala como una promesa silenciosa que hoy hago para ti: mientras la vida me lo permita, elegiré amarte todos los días.",
  },
];

/** URI spotify:track:… a partir del enlace web. */
export function spotifyTrackUri(spotifyUrl: string): string {
  const trackId = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/)?.[1];
  if (!trackId) return spotifyUrl;
  return `spotify:track:${trackId}`;
}

/** URL del iframe embebido de Spotify a partir del enlace del track. */
export function spotifyEmbedUrl(
  spotifyUrl: string,
  options?: { theme?: 0 | 1 }
): string {
  const trackId = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/)?.[1];
  if (!trackId) return spotifyUrl;
  const theme = options?.theme ?? 0;
  return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=${theme}`;
}

/** Convierte "4:23" a segundos. */
export function durationToSeconds(duration: string): number {
  const [m, s] = duration.split(":").map(Number);
  return m * 60 + s;
}

/** Formatea segundos a m:ss */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
