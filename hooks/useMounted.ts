"use client";

import { useEffect, useState } from "react";

/** true solo tras el primer montaje en cliente — evita hydration mismatch. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
