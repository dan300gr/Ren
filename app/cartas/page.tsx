import type { Metadata } from "next";
import { CartasExperience } from "@/sections/cartas/CartasExperience";

export const metadata: Metadata = {
  title: "Cartas",
  description: "Cinco cartas para acompañar a Ren en cualquier momento.",
};

export default function CartasPage() {
  return <CartasExperience />;
}
