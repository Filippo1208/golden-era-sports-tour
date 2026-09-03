import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { ContactPage as ContactPageContent } from "@/components/sections/ContactPage";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";

type ContactRouteProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({
  params,
}: ContactRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });

  return getLocalizedMetadata({
    locale,
    pathname: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default function ContactRoute() {
  return (
    <PublicPageShell heroTone="light" mainClassName="contact-page">
      <ContactPageContent />
    </PublicPageShell>
  );
}
