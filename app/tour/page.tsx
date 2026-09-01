import type { Metadata } from "next";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { TourLandingPage } from "@/components/sections/TourLandingPage";

export const metadata: Metadata = {
  title: "The Tour | Golden Era Sports Tour",
  description:
    "Discover the 2026 Golden Era Sports Tour, an international amateur tennis circuit travelling through five iconic destinations.",
};

export default function TourRoute() {
  return (
    <PublicPageShell heroTone="light">
      <TourLandingPage />
    </PublicPageShell>
  );
}
