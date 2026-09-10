import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { MusicCollection } from "@/components/musica/MusicCollection";
import { SecretHeart } from "@/sections/SecretHeart";

export function MusicaExperience() {
  return (
    <>
      <AppShell activeNav="musica">
        <Container className="py-10 sm:py-14 lg:py-18">
          <SectionIntro
            eyebrow=""
            title={<>Nuestra música <span className="text-accent">♡</span></>}
            description="Canciones que me recuerdan a ti. Cada canción tiene una historia que contar. ♡"
            align="center"
          />
          <MusicCollection />
        </Container>
      </AppShell>
      <SecretHeart />
    </>
  );
}
