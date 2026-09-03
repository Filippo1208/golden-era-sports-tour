import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { ExperiencePage } from "@/components/sections/ExperiencePage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type ExperienceRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: ExperienceRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.experience" });

  return getLocalizedMetadata({
    locale,
    pathname: "/experience",
    title: t("title"),
    description: t("description"),
  });
}

export default function ExperienceRoute() {
  return (
    <PublicPageShell heroTone="light" mainClassName="experience-main">
      <ExperiencePage />
    </PublicPageShell>
  );
}
