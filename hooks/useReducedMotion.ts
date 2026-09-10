"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(notify: () => void) {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", notify);
  return () => mediaQuery.removeEventListener("change", notify);
}

/** Detecta la preferencia de movimiento reducido del sistema. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
