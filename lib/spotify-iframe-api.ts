import type { SpotifyIFrameAPI } from "@/types/spotify-embed";

let apiPromise: Promise<SpotifyIFrameAPI> | null = null;

/** Carga la API de iframe de Spotify una sola vez. */
export function loadSpotifyIframeApi(): Promise<SpotifyIFrameAPI> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Spotify iFrame API solo está disponible en el cliente"));
  }

  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previousReady = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      previousReady?.(IFrameAPI);
      resolve(IFrameAPI);
    };

    if (!document.getElementById("spotify-iframe-api")) {
      const script = document.createElement("script");
      script.id = "spotify-iframe-api";
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return apiPromise;
}
