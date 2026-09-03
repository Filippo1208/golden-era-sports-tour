import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { ConceptPage } from "@/components/sections/ConceptPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type ConceptRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: ConceptRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.concept" });

  return getLocalizedMetadata({
    locale,
    pathname: "/the-concept",
    title: t("title"),
    description: t("description"),
  });
}

export default function TheConceptRoute() {
  return (
    <PublicPageShell heroTone="light">
      <ConceptPage />
    </PublicPageShell>
  );
}
