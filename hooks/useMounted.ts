"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/** true solo tras hidratarse en el cliente. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
