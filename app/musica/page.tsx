import type { Metadata } from "next";
import { MusicaExperience } from "@/sections/musica/MusicaExperience";

export const metadata: Metadata = {
  title: "Nuestra música",
  description: "Cinco canciones y las historias que guardan para nosotras.",
};

export default function MusicaPage() {
  return <MusicaExperience />;
}
