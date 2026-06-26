"use client";

import { DailyHeroMobile } from "@/components/mensajitos/DailyHeroMobile";
import { useMensajitos } from "@/hooks/useMensajitos";

/** @deprecated Usar MensajitosExperience */
export function DailyMessageContent() {
  const { message, refresh } = useMensajitos();
  return (
    <DailyHeroMobile message={message} onRefresh={refresh} />
  );
}

export function DailyMessageSection() {
  return <DailyMessageContent />;
}
