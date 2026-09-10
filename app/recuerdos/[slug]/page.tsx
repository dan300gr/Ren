import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { MemoryNavigator } from "@/components/memories/MemoryNavigator";
import { PaperNote } from "@/components/shared/PaperNote";
import {
  getMemoryBySlug,
  getMemoryNeighbors,
  memories,
  memoryCategoryLabels,
} from "@/data/memories";

export const dynamicParams = false;

export function generateStaticParams() {
  return memories.map((memory) => ({ slug: memory.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const memory = getMemoryBySlug(slug);
  if (!memory) return { title: "Recuerdo" };

  return {
    title: memory.title ?? "Recuerdo",
    description: memory.note ?? "Un recuerdo de nuestra historia.",
  };
}

export default async function MemoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const memory = getMemoryBySlug(slug);
  const neighbors = getMemoryNeighbors(slug);
  if (!memory || !neighbors) notFound();

  const previousHref = `/recuerdos/${neighbors.previous.slug}`;
  const nextHref = `/recuerdos/${neighbors.next.slug}`;
  const rail = Array.from({ length: Math.min(7, memories.length) }, (_, offset) =>
    memories[(neighbors.currentIndex + offset + 1) % memories.length]
  );

  return (
    <AppShell activeNav="recuerdos">
      <Container className="py-6 sm:py-9 lg:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/recuerdos"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 font-serif text-base text-accent-hover transition-colors hover:bg-accent-pale"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Volver a la galería
          </Link>
          <p className="text-sm text-foreground-muted">
            {neighbors.currentIndex + 1} de {memories.length}
          </p>
        </div>

        <MemoryNavigator previousHref={previousHref} nextHref={nextHref}>
          <article className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-start">
            <figure className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-border bg-foreground shadow-[var(--shadow-card)]">
              <Image
                src={memory.image}
                alt={memory.alt}
                width={memory.width}
                height={memory.height}
                priority
                className="h-auto max-h-[78vh] w-full object-contain"
                sizes="(max-width: 1024px) calc(100vw - 3rem), 65vw"
              />
              {memory.favorite && (
                <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-background/92 text-accent shadow-sm backdrop-blur-sm" aria-label="Recuerdo favorito">
                  <Heart className="h-5 w-5" fill="currentColor" aria-hidden />
                </span>
              )}
            </figure>

            <div className="min-w-0 rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7 lg:sticky lg:top-28">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-accent-hover">
                Un pequeño recuerdo
              </p>
              <h1 className="mt-3 font-serif text-[clamp(2rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.04em] text-foreground">
                {memory.title ?? "Un momento de nosotras"} <span className="text-accent">♡</span>
              </h1>

              {(memory.date || memory.location || memory.category) && (
                <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-y border-border-soft py-4 text-sm text-foreground-muted">
                  {memory.date && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
                      <dt className="sr-only">Fecha</dt>
                      <dd>{memory.date}</dd>
                    </div>
                  )}
                  {memory.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" aria-hidden />
                      <dt className="sr-only">Ubicación</dt>
                      <dd>{memory.location}</dd>
                    </div>
                  )}
                  {memory.category && (
                    <div>
                      <dt className="sr-only">Categoría</dt>
                      <dd>{memoryCategoryLabels[memory.category]}</dd>
                    </div>
                  )}
                </dl>
              )}

              {memory.note && (
                <PaperNote className="mt-7">
                  {memory.note} <span className="text-accent">♡</span>
                </PaperNote>
              )}

              <nav className="mt-7 grid grid-cols-2 gap-3" aria-label="Navegación entre recuerdos">
                <Link
                  href={previousHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-3 text-sm font-semibold text-foreground-soft transition-colors hover:bg-accent-pale"
                  aria-label={`Recuerdo anterior: ${neighbors.previous.title ?? "recuerdo"}`}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden /> Anterior
                </Link>
                <Link
                  href={nextHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  aria-label={`Recuerdo siguiente: ${neighbors.next.title ?? "recuerdo"}`}
                >
                  Siguiente <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </nav>
            </div>
          </article>
        </MemoryNavigator>

        <section className="mt-12" aria-labelledby="more-memories-title">
          <div className="flex items-center justify-between gap-4">
            <h2 id="more-memories-title" className="font-serif text-2xl text-foreground sm:text-3xl">
              Más recuerdos de nuestra historia
            </h2>
            <Link href="/recuerdos" className="hidden min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-accent-hover hover:bg-accent-pale sm:inline-flex">
              Ver todos <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-5 flex snap-x gap-3 overflow-x-auto pb-3">
            {rail.map((item) => (
              <Link
                key={item.id}
                href={`/recuerdos/${item.slug}`}
                className="relative aspect-[4/3] w-36 shrink-0 snap-start overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface sm:w-44"
                aria-label={`Abrir ${item.title ?? "otro recuerdo"}`}
              >
                <Image src={item.image} alt="" fill className="object-cover" sizes="176px" />
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </AppShell>
  );
}
