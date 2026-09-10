import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { LettersReader } from "@/components/cartas/LettersReader";
import { SecretHeart } from "@/sections/SecretHeart";

export function CartasExperience() {
  return (
    <>
      <AppShell activeNav="cartas">
        <Container className="py-10 sm:py-14 lg:py-18">
          <SectionIntro
            eyebrow=""
            title={<>Cartas <span className="text-accent">♡</span></>}
            description="Cinco cartas, cinco pedacitos de mi corazón para ti."
            align="center"
          />
          <LettersReader />
        </Container>
      </AppShell>
      <SecretHeart />
    </>
  );
}
