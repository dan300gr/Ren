"use client";

import { useCallback, useState } from "react";
import { CartasGalleryMobile } from "@/components/cartas/CartasGalleryMobile";
import { CartasReaderDesktop } from "@/components/cartas/CartasReaderDesktop";
import { CartasReaderMobile } from "@/components/cartas/CartasReaderMobile";
import { DeskScene } from "@/components/cartas/DeskScene";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileSectionHeader } from "@/components/layout/MobileSectionHeader";
import { SectionSidebar } from "@/components/layout/SectionSidebar";
import { SecretHeart } from "@/sections/SecretHeart";
import { LIGHT_SHELL } from "@/constants";
import { cn } from "@/lib/utils";

type View = "gallery" | "reading";

/** Experiencia completa de la sección Cartas. */
export function CartasExperience() {
  const [view, setView] = useState<View>("gallery");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
    setView("reading");
  }, []);

  const handleBack = useCallback(() => {
    setView("gallery");
    setSelectedId(null);
  }, []);

  return (
    <>
      <div className={LIGHT_SHELL.outer}>
        <div className={cn(LIGHT_SHELL.inner)}>
          <SectionSidebar activeId="cartas" />

          <div className="flex-1 flex flex-col min-h-0 min-w-0 relative">
            <MobileSectionHeader
              showBack={view === "reading"}
              onBack={view === "reading" ? handleBack : undefined}
            />

            {view === "gallery" ? (
              <>
                <div className="hidden lg:flex flex-1 flex-col min-h-0">
                  <DeskScene onSelect={handleSelect} />
                </div>
                <div className="lg:hidden flex-1 flex flex-col min-h-0 overflow-hidden">
                  <CartasGalleryMobile onSelect={handleSelect} />
                </div>
              </>
            ) : selectedId !== null ? (
              <>
                <div className="hidden lg:flex flex-1 flex-col min-h-0">
                  <CartasReaderDesktop
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onBack={handleBack}
                  />
                </div>
                <div className="lg:hidden flex-1 flex flex-col min-h-0">
                  <CartasReaderMobile
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {view === "gallery" && <MobileBottomNav activeId="cartas" />}
      <SecretHeart />
    </>
  );
}
