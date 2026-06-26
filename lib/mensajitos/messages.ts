import { commonMessages } from "@/data/commonMessages";
import { legendaryMessages } from "@/data/legendaryMessages";
import { specialMessages } from "@/data/specialMessages";
import type { DailyMessage, MessageRarity } from "@/types";

const ID_RANGES = {
  common: 1,
  special: 1001,
  legendary: 2001,
} as const;

function buildPool(
  texts: readonly string[],
  startId: number,
  rarity: MessageRarity
): DailyMessage[] {
  return texts.map((text, index) => ({
    id: startId + index,
    text,
    date: "",
    rarity,
  }));
}

export const commonMessagePool = buildPool(
  commonMessages,
  ID_RANGES.common,
  "common"
);

export const specialMessagePool = buildPool(
  specialMessages,
  ID_RANGES.special,
  "special"
);

export const legendaryMessagePool = buildPool(
  legendaryMessages,
  ID_RANGES.legendary,
  "legendary"
);

export const allMessages: DailyMessage[] = [
  ...commonMessagePool,
  ...specialMessagePool,
  ...legendaryMessagePool,
];

const poolsByRarity: Record<MessageRarity, DailyMessage[]> = {
  common: commonMessagePool,
  special: specialMessagePool,
  legendary: legendaryMessagePool,
};

export function getPoolByRarity(rarity: MessageRarity): DailyMessage[] {
  return poolsByRarity[rarity];
}

export function findMessageById(id: number): DailyMessage | undefined {
  return allMessages.find((message) => message.id === id);
}
