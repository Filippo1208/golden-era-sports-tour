import type { Metadata } from "next";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PartnersPage } from "@/components/sections/PartnersPage";

export const metadata: Metadata = {
  title: "Partners | Golden Era Sports Tour",
  description:
    "Discover the official partners supporting the Golden Era Sports Tour and becoming part of the Tour experience.",
};

export default function PartnersRoute() {
  return (
    <PublicPageShell heroTone="light" showOfficialPartners={false}>
      <PartnersPage />
    </PublicPageShell>
  );
}
