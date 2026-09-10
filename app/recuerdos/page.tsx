import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { PaperNote } from "@/components/shared/PaperNote";
import { MemoryGallery } from "@/components/memories/MemoryGallery";
import { SecretHeart } from "@/sections/SecretHeart";

export const metadata: Metadata = {
  title: "Recuerdos",
  description: "Nuestro álbum de fotos, momentos y pequeñas notas.",
};

export default function RecuerdosPage() {
  return (
    <>
      <AppShell activeNav="recuerdos">
        <Container className="py-10 sm:py-14 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
            <SectionIntro
              eyebrow="Un álbum de nosotras"
              title={<>Nuestros <em className="font-handwriting font-normal text-accent">recuerdos</em> <span className="text-accent">♡</span></>}
              description="Cada foto guarda un momento especial. Algunas también tienen una notita; todas son pequeños pedazos de nuestra historia."
            />
            <PaperNote className="max-w-sm lg:justify-self-end">
              Las mejores cosas de la vida son aún más lindas cuando las comparto contigo. ♡
            </PaperNote>
          </div>
          <MemoryGallery />
        </Container>
      </AppShell>
      <SecretHeart />
    </>
  );
}
