import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { JoinPage as JoinPageContent } from "@/components/sections/JoinPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type JoinRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: JoinRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.join" });

  return getLocalizedMetadata({
    locale,
    pathname: "/join",
    title: t("title"),
    description: t("description"),
  });
}

export default function JoinRoute() {
  return (
    <PublicPageShell heroTone="light" mainClassName="join-page-shell">
      <JoinPageContent />
    </PublicPageShell>
  );
}
