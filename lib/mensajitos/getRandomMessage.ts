import type { DailyMessage, MessageRarity } from "@/types";
import {
  allMessages,
  getPoolByRarity,
} from "@/lib/mensajitos/messages";
import {
  canShowLegendaryMessage,
  readLastMessageId,
  writeLastLegendaryDate,
  writeLastMessageId,
} from "@/lib/mensajitos/storage";

const RARITY_WEIGHTS = {
  common: 0.85,
  special: 0.12,
  legendary: 0.03,
} as const;

const MAX_ATTEMPTS = 24;

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

/** Decide la rareza según probabilidades y restricción de 7 días. */
export function rollMessageRarity(legendaryAllowed: boolean): MessageRarity {
  const roll = Math.random();

  if (legendaryAllowed) {
    if (roll < RARITY_WEIGHTS.legendary) return "legendary";
    if (roll < RARITY_WEIGHTS.legendary + RARITY_WEIGHTS.special) {
      return "special";
    }
    return "common";
  }

  const remaining = RARITY_WEIGHTS.common + RARITY_WEIGHTS.special;
  const commonThreshold = RARITY_WEIGHTS.common / remaining;
  return roll < commonThreshold ? "common" : "special";
}

function pickFromPool(
  pool: DailyMessage[],
  excludeId: number | null
): DailyMessage | null {
  const candidates =
    excludeId !== null
      ? pool.filter((message) => message.id !== excludeId)
      : pool;

  if (candidates.length === 0) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

function withDate(message: DailyMessage, now: Date): DailyMessage {
  return {
    ...message,
    date: formatMessageDate(now),
  };
}

function persistSelection(message: DailyMessage, now: Date): void {
  writeLastMessageId(message.id);
  if (message.rarity === "legendary") {
    writeLastLegendaryDate(now);
  }
}

/**
 * Selecciona un mensaje aleatorio respetando rarezas, cooldown legendario
 * y sin repetir el último ID mostrado.
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

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const rarity = rollMessageRarity(legendaryAllowed);
    const pool = getPoolByRarity(rarity);
    const picked = pickFromPool(pool, excludeId);

    if (picked) {
      const message = withDate(picked, now);
      if (persist) persistSelection(message, now);
      return message;
    }
  }

  const fallbackPool = allMessages.filter(
    (message) => message.id !== excludeId
  );
  const pool = fallbackPool.length > 0 ? fallbackPool : allMessages;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  const message = withDate(picked, now);

  if (persist) persistSelection(message, now);
  return message;
}
