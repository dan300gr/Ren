"use client";

import { useCallback, useState } from "react";
import { MusicHeroDesktop } from "@/components/musica/MusicHeroDesktop";
import { MusicLandingMobile } from "@/components/musica/MusicLandingMobile";
import { StoriesCarousel } from "@/components/musica/StoriesCarousel";
import { VinylPlayerMobile } from "@/components/musica/VinylPlayerMobile";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileSectionHeader } from "@/components/layout/MobileSectionHeader";
import { SectionSidebar } from "@/components/layout/SectionSidebar";
import { SecretHeart } from "@/sections/SecretHeart";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { LIGHT_SHELL } from "@/constants";
import { cn } from "@/lib/utils";

type MobileView = "landing" | "player";

/** Experiencia completa de la sección Música. */
export function MusicaExperience() {
  const player = useMusicPlayer();
  const [mobileView, setMobileView] = useState<MobileView>("landing");

  const openPlayer = useCallback(() => setMobileView("player"), []);
  const backToLanding = useCallback(() => setMobileView("landing"), []);

  return (
    <>
      <div className={LIGHT_SHELL.outer}>
        <div className={cn(LIGHT_SHELL.inner)}>
          <SectionSidebar activeId="musica" />

          <div className="flex-1 flex flex-col min-h-0 min-w-0 relative">
            <MobileSectionHeader
              showBack={mobileView === "player"}
              onBack={backToLanding}
            />

            {/* Escritorio */}
            <div className="hidden lg:flex flex-1 flex-col min-h-0 overflow-y-auto">
              <MusicHeroDesktop player={player} />
              <StoriesCarousel player={player} />
            </div>

            {/* Móvil — landing */}
            <div
              className={cn(
                "lg:hidden flex-1 flex flex-col min-h-0",
                mobileView !== "landing" && "hidden"
              )}
            >
              <MusicLandingMobile player={player} onOpenPlayer={openPlayer} />
            </div>

            {/* Móvil — reproductor */}
            <div
              className={cn(
                "lg:hidden flex-1 flex flex-col min-h-0",
                mobileView !== "player" && "hidden"
              )}
            >
              <VinylPlayerMobile player={player} />
            </div>
          </div>
        </div>
      </div>

      {mobileView === "landing" && <MobileBottomNav activeId="musica" />}
      <SecretHeart />
    </>
  );
}
