import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { CollectionPage as CollectionPageContent } from "@/components/sections/CollectionPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type CollectionRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.collection" });

  return getLocalizedMetadata({
    locale,
    pathname: "/collection",
    title: t("title"),
    description: t("description"),
  });
}

export default function CollectionRoute() {
  return (
    <PublicPageShell heroTone="light" mainClassName="collection-page">
      <CollectionPageContent />
    </PublicPageShell>
  );
}
