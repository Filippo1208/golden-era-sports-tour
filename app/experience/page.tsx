import type { Metadata } from "next";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { ExperiencePage } from "@/components/sections/ExperiencePage";

export const metadata: Metadata = {
  title: "The Experience | Golden Era Sports Tour",
  description:
    "Discover the Golden Era Sports Tour experience — tennis, heritage, people and shared moments on and beyond the court.",
};

export default function ExperienceRoute() {
  return (
    <PublicPageShell heroTone="light" mainClassName="experience-main">
      <ExperiencePage />
    </PublicPageShell>
  );
}
