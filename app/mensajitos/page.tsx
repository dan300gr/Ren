import type { Metadata } from "next";
import { MensajitosExperience } from "@/sections/mensajitos/MensajitosExperience";

export const metadata: Metadata = {
  title: "Mensajitos",
  description: "Pequeños recordatorios de amor para acompañar a Ren.",
};

export default function MensajitosPage() {
  return <MensajitosExperience />;
}
