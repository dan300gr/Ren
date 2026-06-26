"use client";

import { DailyHeroDesktop } from "@/components/mensajitos/DailyHeroDesktop";
import { DailyHeroMobile } from "@/components/mensajitos/DailyHeroMobile";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileSectionHeader } from "@/components/layout/MobileSectionHeader";
import { SectionSidebar } from "@/components/layout/SectionSidebar";
import { SecretHeart } from "@/sections/SecretHeart";
import { useMensajitos } from "@/hooks/useMensajitos";
import { LIGHT_SHELL } from "@/constants";
import { cn } from "@/lib/utils";

/** Experiencia completa de la sección Mensajitos. */
export function MensajitosExperience() {
  const { message, refresh } = useMensajitos();

  return (
    <>
      <div className={LIGHT_SHELL.outer}>
        <div className={cn(LIGHT_SHELL.inner)}>
          <SectionSidebar activeId="mensajito" />

          <div className="flex-1 flex flex-col min-h-0 min-w-0 relative">
            <MobileSectionHeader />

            <div className="hidden lg:flex flex-1 flex-col min-h-0 overflow-y-auto">
              <DailyHeroDesktop message={message} onRefresh={refresh} />
            </div>

            <div className="lg:hidden flex-1 flex flex-col min-h-0">
              <DailyHeroMobile message={message} onRefresh={refresh} />
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav activeId="mensajito" />
      <SecretHeart />
    </>
  );
}
