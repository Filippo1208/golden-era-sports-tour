import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { TourStageLanding } from "@/components/sections/TourStageLanding";
import { tourEvents } from "@/data/events";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedMetadata } from "@/lib/metadata";
import { getSportsEventStructuredData } from "@/lib/structured-data";
import type { TourEvent, TourEventLandingContent } from "@/types/content";

type TourStagePageProps = {
  params: Promise<{
    locale: AppLocale;
    slug: string;
  }>;
};

type TourEventWithLanding = TourEvent & {
  landingContent: TourEventLandingContent;
};

function getTourStageBySlug(slug: string): TourEventWithLanding | null {
  const event = tourEvents.find((tourEvent) => tourEvent.slug === slug);

  if (!event?.landingContent) {
    return null;
  }

  return event as TourEventWithLanding;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return tourEvents
    .filter((event) => event.landingContent)
    .map((event) => ({
      slug: event.slug,
    }));
}

export async function generateMetadata({
  params,
}: TourStagePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getTourStageBySlug(slug);

  if (!event) {
    const t = await getTranslations({ locale, namespace: "Metadata" });

    return getLocalizedMetadata({
      locale,
      pathname: `/tour/${slug}`,
      title: t("tourStageFallbackTitle"),
    });
  }

  const t = await getTranslations({
    locale,
    namespace: "Metadata.tourStages.monteCarlo",
  });

  return getLocalizedMetadata({
    locale,
    pathname: `/tour/${slug}`,
    title: t("title"),
    description: t("description"),
  });
}

export default async function TourStagePage({ params }: TourStagePageProps) {
  const { slug } = await params;
  const event = getTourStageBySlug(slug);

  if (!event) {
    notFound();
  }

  const sportsEventStructuredData =
    event.slug === "monte-carlo"
      ? getSportsEventStructuredData({
          canonicalPath: "/en/tour/monte-carlo",
          event,
          location: {
            name: "Monte-Carlo Country Club",
            address: {
              streetAddress: "155 avenue Princesse Grace",
              postalCode: "06190",
              addressLocality: "Roquebrune-Cap-Martin",
              addressCountry: "FR",
            },
          },
          name: "Golden Era Sports Tour — Monte-Carlo",
          sport: "Tennis",
        })
      : null;

  return (
    <>
      {sportsEventStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sportsEventStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      ) : null}
      <PublicPageShell heroTone="light">
        <TourStageLanding event={event} />
      </PublicPageShell>
    </>
  );
}
