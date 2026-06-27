import type { DailyMessage } from "@/types";
import { allMessages } from "@/lib/mensajitos/messages";
import {
  canShowLegendaryMessage,
  clearSeenMessageIds,
  readSeenMessageIds,
  readLastMessageId,
  writeLastLegendaryDate,
  writeLastMessageId,
  writeSeenMessageIds,
} from "@/lib/mensajitos/storage";

export interface GetRandomMessageOptions {
  /** ID a excluir (normalmente el último mostrado). */
  excludeId?: number | null;
  /** Si es false, no persiste en localStorage (útil en tests). */
  persist?: boolean;
  /** Fecha para el campo `date` del mensaje. */
  now?: Date;
}

function formatMessageDate(date: Date): string {
  return date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
  });
}

function withDate(message: DailyMessage, now: Date): DailyMessage {
  return {
    ...message,
    date: formatMessageDate(now),
  };
}

function buildCandidates(
  excludeId: number | null,
  legendaryAllowed: boolean,
  seenIds: number[]
): DailyMessage[] {
  const seenSet = new Set(seenIds);
  return allMessages.filter((message) => {
    if (message.id === excludeId) return false;
    if (!legendaryAllowed && message.rarity === "legendary") return false;
    return !seenSet.has(message.id);
  });
}

function persistSelection(message: DailyMessage, now: Date): void {
  writeLastMessageId(message.id);
  if (message.rarity === "legendary") {
    writeLastLegendaryDate(now);
  }
}

/**
 * Selecciona un mensaje aleatorio evitando repeticiones hasta agotar el ciclo.
 */
export function getRandomMessage(
  options: GetRandomMessageOptions = {}
): DailyMessage {
  const {
    excludeId = readLastMessageId(),
    persist = true,
    now = new Date(),
  } = options;

  const legendaryAllowed = canShowLegendaryMessage(now);
  let seenIds = readSeenMessageIds();

  let pool = buildCandidates(excludeId, legendaryAllowed, seenIds);

  if (pool.length === 0) {
    clearSeenMessageIds();
    seenIds = [];
    pool = buildCandidates(excludeId, legendaryAllowed, []);
  }

  if (pool.length === 0) {
    pool = allMessages.filter((message) => message.id !== excludeId);
  }

  if (pool.length === 0) {
    pool = allMessages;
  }

  const picked = pool[Math.floor(Math.random() * pool.length)];
  const message = withDate(picked, now);

  const nextSeenIds = [...new Set([...seenIds, message.id])];
  writeSeenMessageIds(nextSeenIds);

  if (persist) persistSelection(message, now);
  return message;
}
