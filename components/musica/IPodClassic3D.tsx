"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import {
  SpotifyEmbed,
  type SpotifyEmbedHandle,
} from "@/components/musica/SpotifyEmbed";
import type { Song } from "@/types";
import { cn } from "@/lib/utils";

interface IPodClassic3DProps {
  song: Song;
  currentIndex: number;
  totalSongs: number;
  isPlaying: boolean;
  size?: "md" | "lg";
  onPrev?: () => void;
  onNext?: () => void;
  onPlayingChange?: (isPlaying: boolean) => void;
  onOpenSpotify?: () => void;
  className?: string;
}

/** iPod Classic rosa fotorrealista con pantalla interactiva. */
export function IPodClassic3D({
  song,
  currentIndex,
  totalSongs,
  isPlaying,
  size = "lg",
  onPrev,
  onNext,
  onPlayingChange,
  onOpenSpotify,
  className,
}: IPodClassic3DProps) {
  const scale = size === "lg" ? 1 : 0.82;
  const scaledWidth = 260 * scale;
  const scaledHeight = 411 * scale;
  const embedRef = useRef<SpotifyEmbedHandle>(null);

  const resumeIfPlaying = () => {
    if (!isPlaying) return;
    window.setTimeout(() => embedRef.current?.play(), 400);
  };

  const handlePrev = () => {
    onPrev?.();
    resumeIfPlaying();
  };

  const handleNext = () => {
    onNext?.();
    resumeIfPlaying();
  };

  const handleTogglePlay = () => {
    embedRef.current?.togglePlay();
  };

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ width: scaledWidth, height: scaledHeight }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {/* Auriculares */}
        {size === "lg" && (
          <div className="absolute -right-10 top-[38%] z-0 hidden xl:block" aria-hidden>
            <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
              <path d="M40 0 C20 30, 15 60, 20 90" stroke="#D4D4D4" strokeWidth="2" />
              <ellipse cx="20" cy="95" rx="10" ry="12" fill="#E8E8E8" stroke="#CCC" />
              <ellipse cx="60" cy="95" rx="10" ry="12" fill="#E8E8E8" stroke="#CCC" />
              <path d="M40 0 C60 30, 65 60, 60 90" stroke="#D4D4D4" strokeWidth="2" />
            </svg>
          </div>
        )}

        <div
          className="relative w-[260px] rounded-[36px] p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          style={{
            background: "linear-gradient(165deg, #F0B8C0 0%, #E8A0B0 35%, #D890A8 100%)",
          }}
        >
          <div className="absolute top-2 left-6 right-6 h-6 bg-gradient-to-b from-white/35 to-transparent rounded-full" />

          {/* Pantalla con reproductor Spotify */}
          <div className="rounded-[18px] bg-gradient-to-b from-[#E8E8E8] to-[#D0D0D0] p-2 shadow-inner">
            <div className="rounded-xl bg-[#121212] p-1 overflow-hidden">
              <SpotifyEmbed
                ref={embedRef}
                spotifyUrl={song.spotifyUrl}
                title={song.title}
                compact
                onPlaybackUpdate={onPlayingChange}
              />
              <p className="text-center text-[8px] text-white/30 pb-1">
                {currentIndex + 1} de {totalSongs}
              </p>
            </div>
          </div>

          {/* Click wheel */}
          <div className="relative mt-3 flex justify-center">
            <div className="relative w-[190px] h-[190px]">
              <div
                className="absolute inset-0 rounded-full shadow-inner"
                style={{
                  background: "linear-gradient(180deg, #F0C8D0 0%, #E8B0C0 100%)",
                }}
              />

              <WheelBtn pos="top" label="MENU" />
              <WheelBtn pos="left" onClick={handlePrev} ariaLabel="Anterior">
                <ChevronLeft className="w-4 h-4" />
              </WheelBtn>
              <WheelBtn pos="right" onClick={handleNext} ariaLabel="Siguiente">
                <ChevronRight className="w-4 h-4" />
              </WheelBtn>
              <WheelBtn pos="bottom" onClick={onOpenSpotify} ariaLabel="Spotify">
                <ExternalLink className="w-3.5 h-3.5" />
              </WheelBtn>

              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handleTogglePlay}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={{
                  background: "linear-gradient(180deg, #F8E0E8 0%, #F0D0D8 100%)",
                }}
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <div className="flex gap-1">
                    <span className="w-1 h-4 bg-rose-500 rounded-full" />
                    <span className="w-1 h-4 bg-rose-500 rounded-full" />
                  </div>
                ) : (
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-rose-500 ml-1" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WheelBtn({
  pos,
  label,
  onClick,
  ariaLabel,
  children,
}: {
  pos: "top" | "left" | "right" | "bottom";
  label?: string;
  onClick?: () => void;
  ariaLabel?: string;
  children?: React.ReactNode;
}) {
  const posMap = {
    top: "top-1.5 left-1/2 -translate-x-1/2",
    left: "left-1.5 top-1/2 -translate-y-1/2",
    right: "right-1.5 top-1/2 -translate-y-1/2",
    bottom: "bottom-1.5 left-1/2 -translate-x-1/2",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute z-10 p-1.5 text-[9px] font-medium text-rose-600/60 hover:text-rose-700 transition-colors",
        onClick ? "cursor-pointer" : "cursor-default",
        posMap[pos]
      )}
      aria-label={ariaLabel || label}
    >
      {children || label}
    </button>
  );
}
