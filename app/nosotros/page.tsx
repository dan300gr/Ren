import { redirect } from "next/navigation";
import { SHOW_NOSOTRAS_SECTION } from "@/constants";
import { NosotrasExperience } from "@/sections/nosotras/NosotrasExperience";

export default function NosotrosPage() {
  if (!SHOW_NOSOTRAS_SECTION) {
    redirect("/");
  }

  return <NosotrasExperience />;
}
