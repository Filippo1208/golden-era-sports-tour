import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { TourLandingPage } from "@/components/sections/TourLandingPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type TourRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: TourRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.tour" });

  return getLocalizedMetadata({
    locale,
    pathname: "/tour",
    title: t("title"),
    description: t("description"),
  });
}

export default function TourRoute() {
  return (
    <PublicPageShell heroTone="light">
      <TourLandingPage />
    </PublicPageShell>
  );
}
