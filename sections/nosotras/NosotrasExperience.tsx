"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { CollageDesktop } from "@/components/nosotras/CollageDesktop";
import { PhotoDetailDesktop } from "@/components/nosotras/PhotoDetailDesktop";
import { PhotoDetailMobile } from "@/components/nosotras/PhotoDetailMobile";
import { StackGalleryMobile } from "@/components/nosotras/StackGalleryMobile";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileSectionHeader } from "@/components/layout/MobileSectionHeader";
import { SectionSidebar } from "@/components/layout/SectionSidebar";
import { SecretHeart } from "@/sections/SecretHeart";
import { photos } from "@/data/photos";
import { LIGHT_SHELL } from "@/constants";
import { cn } from "@/lib/utils";

type View = "gallery" | "detail";

/** Experiencia completa de la sección Nosotras. */
export function NosotrasExperience() {
  const [view, setView] = useState<View>("gallery");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [stackIndex, setStackIndex] = useState(0);

  const selectedPhoto = photos.find((p) => p.id === selectedId) ?? null;
  const selectedIndex = photos.findIndex((p) => p.id === selectedId);

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
    setView("detail");
  }, []);

  const handleClose = useCallback(() => {
    setView("gallery");
    setSelectedId(null);
  }, []);

  const goPrev = useCallback(() => {
    if (selectedIndex < 0) return;
    const prev = photos[(selectedIndex - 1 + photos.length) % photos.length];
    setSelectedId(prev.id);
  }, [selectedIndex]);

  const goNext = useCallback(() => {
    if (selectedIndex < 0) return;
    const next = photos[(selectedIndex + 1) % photos.length];
    setSelectedId(next.id);
  }, [selectedIndex]);

  const backToGallery = useCallback(() => {
    setView("gallery");
    setSelectedId(null);
  }, []);

  return (
    <>
      <div className={LIGHT_SHELL.outer}>
        <div className={cn(LIGHT_SHELL.inner)}>
          <SectionSidebar activeId="recuerdos" />

          <div className="flex-1 flex flex-col min-h-0 min-w-0 relative">
            <MobileSectionHeader
              showBack={view === "detail"}
              onBack={backToGallery}
            />

            {/* Escritorio */}
            <div className="hidden lg:flex relative flex-1 flex-col min-h-0">
              {view === "gallery" ? (
                <CollageDesktop onSelect={handleSelect} />
              ) : selectedPhoto ? (
                <CollageDesktop onSelect={handleSelect} />
              ) : null}
              <AnimatePresence>
                {view === "detail" && selectedPhoto && (
                  <PhotoDetailDesktop
                    photo={selectedPhoto}
                    onClose={handleClose}
                    onPrev={goPrev}
                    onNext={goNext}
                    onViewAll={handleClose}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Móvil — galería */}
            <div
              className={cn(
                "lg:hidden flex-1 flex flex-col min-h-0",
                view !== "gallery" && "hidden"
              )}
            >
              <StackGalleryMobile
                activeIndex={stackIndex}
                onSelect={handleSelect}
                onSwipe={(dir) =>
                  setStackIndex((i) =>
                    Math.max(0, Math.min(photos.length - 1, i + dir))
                  )
                }
              />
            </div>

            {/* Móvil — detalle */}
            <div
              className={cn(
                "lg:hidden flex-1 flex flex-col min-h-0",
                view !== "detail" && "hidden"
              )}
            >
              {selectedPhoto && (
                <PhotoDetailMobile
                  photo={selectedPhoto}
                  onPrev={goPrev}
                  onNext={goNext}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {view === "gallery" && <MobileBottomNav activeId="recuerdos" />}
      <SecretHeart />
    </>
  );
}
