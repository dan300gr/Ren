"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { spotifyTrackUri } from "@/data/songs";
import { loadSpotifyIframeApi } from "@/lib/spotify-iframe-api";
import type { SpotifyEmbedController } from "@/types/spotify-embed";
import { cn } from "@/lib/utils";

export interface SpotifyEmbedHandle {
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  loadUri: (uri: string) => void;
}

interface SpotifyEmbedProps {
  spotifyUrl: string;
  title: string;
  className?: string;
  /** Compacto para pantalla del iPod (152px). */
  compact?: boolean;
  onPlaybackUpdate?: (isPlaying: boolean) => void;
}

/** Reproductor embebido de Spotify controlable vía ref (iFrame API). */
export const SpotifyEmbed = forwardRef<SpotifyEmbedHandle, SpotifyEmbedProps>(
  function SpotifyEmbed(
    { spotifyUrl, title, className, compact = false, onPlaybackUpdate },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const controllerRef = useRef<SpotifyEmbedController | null>(null);
    const playbackListenerRef = useRef<
      ((data: { isPaused?: boolean }) => void) | null
    >(null);
    const onPlaybackUpdateRef = useRef(onPlaybackUpdate);
    onPlaybackUpdateRef.current = onPlaybackUpdate;

    useImperativeHandle(ref, () => ({
      togglePlay: () => controllerRef.current?.togglePlay(),
      play: () => controllerRef.current?.play(),
      pause: () => controllerRef.current?.pause(),
      loadUri: (uri: string) => controllerRef.current?.loadUri(uri),
    }));

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      let cancelled = false;
      const initialUri = spotifyTrackUri(spotifyUrl);

      loadSpotifyIframeApi().then((IFrameAPI) => {
        if (cancelled) return;

        IFrameAPI.createController(
          el,
          {
            uri: initialUri,
            width: "100%",
            height: compact ? "152" : "352",
            theme: "0",
          },
          (controller) => {
            if (cancelled) return;

            controllerRef.current = controller;

            const onPlayback = (data: { isPaused?: boolean }) => {
              onPlaybackUpdateRef.current?.(!data.isPaused);
            };
            playbackListenerRef.current = onPlayback;
            controller.addListener("playback_update", onPlayback);
          }
        );
      });

      return () => {
        cancelled = true;
        if (controllerRef.current && playbackListenerRef.current) {
          controllerRef.current.removeListener(
            "playback_update",
            playbackListenerRef.current
          );
        }
        controllerRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- init una vez; loadUri en otro effect
    }, [compact]);

    useEffect(() => {
      controllerRef.current?.loadUri(spotifyTrackUri(spotifyUrl));
    }, [spotifyUrl]);

    return (
      <div
        ref={containerRef}
        data-testid="embed-iframe"
        className={cn("w-full overflow-hidden", className)}
        aria-label={`Reproducir ${title} en Spotify`}
      />
    );
  }
);
