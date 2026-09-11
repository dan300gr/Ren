"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function MemoryNavigator({
  previousHref,
  nextHref,
  children,
}: {
  previousHref: string;
  nextHref: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const ignoreSwipe = useRef(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") router.push(previousHref);
      if (event.key === "ArrowRight") router.push(nextHref);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextHref, previousHref, router]);

  return (
    <div
      onTouchStart={(event) => {
        const target = event.target as HTMLElement | null;
        ignoreSwipe.current = Boolean(
          target?.closest("a, button, input, textarea, select, [contenteditable='true'], [data-no-swipe]")
        );

        if (ignoreSwipe.current) {
          touchStart.current = null;
          return;
        }

        const touch = event.touches[0];
        touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start || ignoreSwipe.current) {
          ignoreSwipe.current = false;
          return;
        }

        const end = event.changedTouches[0];
        if (!end) return;

        const deltaX = end.clientX - start.x;
        const deltaY = end.clientY - start.y;
        const horizontalSwipe = Math.abs(deltaX) >= 70 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5;

        if (!horizontalSwipe) return;

        router.push(deltaX > 0 ? previousHref : nextHref);
        ignoreSwipe.current = false;
      }}
      onTouchCancel={() => {
        touchStart.current = null;
        ignoreSwipe.current = false;
      }}
    >
      <span className="sr-only">Usa las flechas del teclado o desliza la fotografía para cambiar de recuerdo.</span>
      {children}
    </div>
  );
}
