import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PrivacyPage as PrivacyPageContent } from "@/components/sections/PrivacyPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type PrivacyRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: PrivacyRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.privacy" });

  return getLocalizedMetadata({
    locale,
    pathname: "/privacy",
    title: t("title"),
    description: t("description"),
  });
}

export default function PrivacyRoute() {
  return (
    <PublicPageShell
      heroTone="light"
      mainClassName="privacy-page-shell"
      showOfficialPartners={false}
    >
      <PrivacyPageContent />
    </PublicPageShell>
  );
}
