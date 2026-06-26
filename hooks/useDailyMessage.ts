"use client";

import { useCallback, useEffect, useState } from "react";
import { getRandomMessage } from "@/lib/mensajitos/getRandomMessage";
import { allMessages } from "@/lib/mensajitos/messages";
import type { DailyMessage } from "@/types";

/**
 * Mensaje diario aleatorio que nunca se repite dos veces seguidas.
 */
export function useDailyMessage() {
  const [message, setMessage] = useState<DailyMessage | null>(null);

  useEffect(() => {
    setMessage(getRandomMessage());
  }, []);

  const refresh = useCallback(() => {
    setMessage((current) =>
      getRandomMessage({ excludeId: current?.id ?? null })
    );
  }, []);

  return { message: message ?? allMessages[0], refresh };
}
