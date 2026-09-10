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
  const touchStart = useRef<number | null>(null);

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
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const end = event.changedTouches[0]?.clientX;
        if (end === undefined) return;
        const distance = end - touchStart.current;
        touchStart.current = null;
        if (Math.abs(distance) < 60) return;
        router.push(distance > 0 ? previousHref : nextHref);
      }}
    >
      <span className="sr-only">Usa las flechas del teclado o desliza la fotografía para cambiar de recuerdo.</span>
      {children}
    </div>
  );
}
