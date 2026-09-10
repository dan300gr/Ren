import { AppShell } from "@/components/layout/AppShell";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { MessagesExperience } from "@/components/mensajitos/MessagesExperience";
import { SecretHeart } from "@/sections/SecretHeart";

export function MensajitosExperience() {
  return (
    <>
      <AppShell activeNav="mensajitos">
        <Container className="py-10 sm:py-14 lg:py-18">
          <SectionIntro
            eyebrow="Algo lindo para ti"
            title={
              <>
                Mensajito del{" "}
                <em className="font-handwriting font-normal text-accent">día</em>{" "}
                <span className="text-accent">♡</span>
              </>
            }
            description="Un pequeño recordatorio de cuánto te amo, para releer cuando necesites sentirme cerquita."
          />
          <MessagesExperience />
        </Container>
      </AppShell>
      <SecretHeart />
    </>
  );
}
