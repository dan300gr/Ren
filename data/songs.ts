import type { Song } from "@/types";

export const songs: Song[] = [
  {
    id: 1,
    title: "Ahí Estabas Tú",
    artist: "Carín León",
    spotifyUrl: "https://open.spotify.com/track/3hwtMoZGYylPlecZGAdW6y",
    duration: "3:28",
    shortMessage: "Ahí estabas tú, y ahí supe que eras tú.",
    albumColor: "#C9A882",
    albumColorSecondary: "#8B6B4A",
    story:
      "Cada vez que suena, vuelvo a ese instante en que te vi y supe que no había nadie más. Ahí estabas tú, exactamente donde tenías que estar.",
  },
  {
    id: 2,
    title: "The Prophecy",
    artist: "Taylor Swift",
    spotifyUrl: "https://open.spotify.com/track/18WFFUIsewmA8g31KAeo3e",
    duration: "4:09",
    shortMessage: "Como un augurio que ya sabía que serías tú.",
    albumColor: "#B8B0A8",
    albumColorSecondary: "#8A8278",
    story:
      "Esta canción suena a destino. Como si alguien ya hubiera escrito que nuestros caminos se cruzarían, y yo solo tuve que esperarte.",
  },
  {
    id: 3,
    title: "All of Me",
    artist: "John Legend",
    spotifyUrl: "https://open.spotify.com/track/3U4isSBGWxtj6n5udPpH6e",
    duration: "4:29",
    shortMessage: "Te doy todo de mí, siempre.",
    albumColor: "#B8A9C9",
    albumColorSecondary: "#8B7BA8",
    story:
      "Porque me das todo de ti, y yo quiero darte todo de mí. Esta canción es mi promesa silenciosa de que siempre estaré aquí, completa, para ti.",
  },
  {
    id: 4,
    title: "Yellow",
    artist: "Coldplay",
    spotifyUrl: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg",
    duration: "4:26",
    shortMessage: "Eres mi estrella, mi luz.",
    albumColor: "#E8D4A0",
    albumColorSecondary: "#C4A86E",
    story:
      "Look at the stars, look how they shine for you. Cada vez que veo el cielo nocturno, pienso en esta canción y en ti.",
  },
  {
    id: 5,
    title: "Corazón",
    artist: "Maluma",
    spotifyUrl: "https://open.spotify.com/track/5Z01UMMQt7FebreRMN61tU",
    duration: "3:45",
    shortMessage: "Nuestra canción de baile en la cocina.",
    albumColor: "#D4A5A5",
    albumColorSecondary: "#B08080",
    story:
      "Nuestra canción de baile en la cocina. Sin importar el día, siempre encontramos un momento para movernos juntos, riendo como si nadie nos mirara.",
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
