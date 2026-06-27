import {
  LAST_MESSAGE_ID_KEY,
  LEGENDARY_COOLDOWN_DAYS,
  LEGENDARY_DATE_KEY,
  SEEN_MESSAGE_IDS_KEY,
} from "@/constants/mensajitos";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function readLastMessageId(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_MESSAGE_ID_KEY);
    if (!raw) return null;
    const id = Number.parseInt(raw, 10);
    return Number.isNaN(id) ? null : id;
  } catch {
    return null;
  }
}

export function writeLastMessageId(id: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_MESSAGE_ID_KEY, String(id));
  } catch {
    /* ignore */
  }
}

export function readSeenMessageIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SEEN_MESSAGE_IDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is number => Number.isInteger(id));
  } catch {
    return [];
  }
}

export function writeSeenMessageIds(ids: number[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SEEN_MESSAGE_IDS_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function clearSeenMessageIds(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SEEN_MESSAGE_IDS_KEY);
  } catch {
    /* ignore */
  }
}

export function readLastLegendaryDate(): Date | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LEGENDARY_DATE_KEY);
    if (!raw) return null;
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

export function writeLastLegendaryDate(date: Date): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEGENDARY_DATE_KEY, date.toISOString());
  } catch {
    /* ignore */
  }
}

/** Indica si ya pasaron los días mínimos desde el último mensaje muy especial. */
export function canShowLegendaryMessage(
  now = new Date(),
  cooldownDays = LEGENDARY_COOLDOWN_DAYS
): boolean {
  const last = readLastLegendaryDate();
  if (!last) return true;
  const elapsedDays = (now.getTime() - last.getTime()) / MS_PER_DAY;
  return elapsedDays >= cooldownDays;
}
