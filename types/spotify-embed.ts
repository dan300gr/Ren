export interface SpotifyPlaybackUpdate {
  isPaused?: boolean;
  playingURI?: string;
  isBuffering?: boolean;
  duration?: number;
  position?: number;
}

export interface SpotifyEmbedController {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  addListener: (
    event: "ready" | "playback_update",
    callback: (data: SpotifyPlaybackUpdate) => void
  ) => void;
  removeListener: (
    event: "ready" | "playback_update",
    callback: (data: SpotifyPlaybackUpdate) => void
  ) => void;
}

export interface SpotifyIFrameAPI {
  createController: (
    element: HTMLElement,
    options: {
      uri: string;
      width?: string;
      height?: string;
      theme?: string;
    },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
  }
}
