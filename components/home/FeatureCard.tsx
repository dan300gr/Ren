import Link from "next/link";
import { ArrowRight, Camera, Heart, Mail, Music } from "lucide-react";
import type { FeatureCardData } from "@/types";
import {
  EnvelopesPreview,
  IPodPreview,
  PolaroidsPreview,
  StickyNotePreview,
} from "@/components/home/CardPreviews";

const icons = {
  mail: Mail,
  music: Music,
  camera: Camera,
  heart: Heart,
} as const;

const previews = {
  cartas: EnvelopesPreview,
  musica: IPodPreview,
  recuerdos: PolaroidsPreview,
  mensajitos: StickyNotePreview,
} as const;

export function FeatureCard({ card }: { card: FeatureCardData }) {
  const Icon = icons[card.icon];
  const Preview = previews[card.preview];

  return (
    <Link
      href={card.href}
      className="group relative flex min-h-[12.5rem] min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-raised)] sm:min-h-0 sm:p-5 lg:h-full"
      aria-label={`Ir a ${card.title}`}
    >
      <Icon className="relative z-10 h-5 w-5 shrink-0 text-accent" strokeWidth={1.6} aria-hidden />

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-1 transition-transform duration-300 group-hover:-translate-y-0.5">
        <Preview />
      </div>

      <div className="relative z-10 mt-auto max-w-[82%] pr-10">
        <h3 className="font-serif text-[1.35rem] leading-tight text-foreground sm:text-2xl">
          {card.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-accent-hover">
          {card.subtitle}
        </p>
        <p className="mt-2 text-sm leading-5 text-foreground-muted">
          {card.description}
        </p>
      </div>

      <span className="absolute bottom-3.5 right-3.5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-colors group-hover:bg-accent-hover sm:bottom-4 sm:right-4 sm:h-11 sm:w-11" aria-hidden>
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
