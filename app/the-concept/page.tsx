import type { Metadata } from "next";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { ConceptPage } from "@/components/sections/ConceptPage";

export const metadata: Metadata = {
  title: "The Concept | Golden Era Sports Tour",
  description:
    "Discover the Golden Era Sports Tour concept: an amateur tennis format that brings the heritage and evolution of racquet technology back onto the court.",
};

export default function TheConceptRoute() {
  return (
    <PublicPageShell heroTone="light">
      <ConceptPage />
    </PublicPageShell>
  );
}
