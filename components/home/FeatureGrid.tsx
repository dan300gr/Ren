"use client";

import { FEATURE_CARDS } from "@/constants";
import { FeatureCard } from "@/components/home/FeatureCard";
import { cn } from "@/lib/utils";

/** Grid de tarjetas de navegación del inicio (2×2 o 2+1 según secciones activas). */
export function FeatureGrid({ theme = "light" }: { theme?: "dark" | "light" }) {
  const hasOddLast = FEATURE_CARDS.length % 2 === 1;

  return (
    <section
      className="flex-1 p-4 md:p-5 lg:p-6 lg:pl-0 lg:ml-4"
      aria-label="Secciones"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 h-full auto-rows-fr">
        {FEATURE_CARDS.map((card, index) => (
          <FeatureCard
            key={card.href}
            card={card}
            index={index}
            theme={theme}
            horizontal={hasOddLast && index === FEATURE_CARDS.length - 1}
            className={cn(
              hasOddLast &&
                index === FEATURE_CARDS.length - 1 &&
                "sm:col-span-2"
            )}
          />
        ))}
      </div>
    </section>
  );
}
