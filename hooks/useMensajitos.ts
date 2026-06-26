"use client";

import { useCallback, useEffect, useState } from "react";
import { SAVED_STORAGE_KEY } from "@/constants/mensajitos";
import { getRandomMessage } from "@/lib/mensajitos/getRandomMessage";
import { allMessages } from "@/lib/mensajitos/messages";
import type { DailyMessage } from "@/types";

/** Mensaje del día + guardados en localStorage. */
export function useMensajitos() {
  const [message, setMessage] = useState<DailyMessage | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMessage(getRandomMessage());
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      if (raw) setSavedIds(JSON.parse(raw) as number[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const refresh = useCallback(() => {
    setMessage((current) =>
      getRandomMessage({ excludeId: current?.id ?? null })
    );
  }, []);

  const isSaved = useCallback(
    (id: number) => savedIds.includes(id),
    [savedIds]
  );

  const toggleSave = useCallback((id: number) => {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const activeMessage = message ?? allMessages[0];

  const savedMessages: DailyMessage[] = allMessages.filter((m) =>
    savedIds.includes(m.id)
  );

  const previousMessages = allMessages.filter((m) => m.id !== activeMessage.id);

  return {
    message: activeMessage,
    refresh,
    savedIds,
    savedMessages,
    savedCount: savedIds.length,
    previousMessages,
    isSaved,
    toggleSave,
    hydrated,
  };
}
