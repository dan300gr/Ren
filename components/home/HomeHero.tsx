import Image from "next/image";
import { HERO } from "@/constants";
import { PaperNote } from "@/components/shared/PaperNote";

export function HomeHero() {
  return (
    <section
      className="relative min-h-[32rem] overflow-hidden rounded-[var(--radius-lg)] bg-foreground sm:min-h-[36rem] lg:h-full lg:min-h-[38rem]"
      aria-labelledby="home-title"
    >
      <Image
        src={HERO.backgroundImage ?? "/images/home/hero-together.webp"}
        alt="Ren y su novia sonriendo juntas durante un viaje"
        fill
        priority
        className="object-cover object-[58%_center] sm:object-center"
        sizes="(max-width: 1024px) calc(100vw - 3rem), 52vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/62 via-foreground/15 to-foreground/62 sm:bg-gradient-to-r sm:from-foreground/68 sm:via-foreground/24 sm:to-transparent" />

      <div className="relative z-10 flex min-h-[32rem] flex-col p-5 sm:min-h-[36rem] sm:p-8 lg:min-h-[38rem] lg:h-full lg:p-9">
        <div className="max-w-[34rem] text-white">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/75">
            Un pequeño lugar
          </p>
          <h1
            id="home-title"
            className="mt-4 font-serif text-[clamp(2rem,5.1vw,3.25rem)] leading-[1.12] tracking-[-0.035em]"
          >
            Para que <em className="font-handwriting font-normal text-rose-200">siempre</em>{" "}
            recuerdes que te amo, en cualquier momento del día. ♡
          </h1>
        </div>

        <PaperNote className="mt-auto max-w-[19rem] self-start bg-background/94 px-4 py-3.5 backdrop-blur-sm sm:max-w-[20rem]">
          {HERO.glassText}
        </PaperNote>
      </div>
    </section>
  );
}
