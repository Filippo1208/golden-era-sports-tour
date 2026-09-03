import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { TeamPage as TeamPageContent } from "@/components/sections/TeamPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type TeamRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: TeamRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.team" });

  return getLocalizedMetadata({
    locale,
    pathname: "/team",
    title: t("title"),
    description: t("description"),
  });
}

export default function TeamPage() {
  return (
    <PublicPageShell heroTone="light" mainClassName="team-page">
      <TeamPageContent />
    </PublicPageShell>
  );
}
