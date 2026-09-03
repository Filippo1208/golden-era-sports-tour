import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PartnersPage } from "@/components/sections/PartnersPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type PartnersRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: PartnersRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.partners" });

  return getLocalizedMetadata({
    locale,
    pathname: "/partners",
    title: t("title"),
    description: t("description"),
  });
}

export default function PartnersRoute() {
  return (
    <PublicPageShell heroTone="light" showOfficialPartners={false}>
      <PartnersPage />
    </PublicPageShell>
  );
}
