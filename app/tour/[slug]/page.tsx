import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { TourStageLanding } from "@/components/sections/TourStageLanding";
import { tourEvents } from "@/data/events";
import type { TourEvent, TourEventLandingContent } from "@/types/content";

type TourStagePageProps = {
  params: Promise<{
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
  const { slug } = await params;
  const event = getTourStageBySlug(slug);

  if (!event) {
    return {
      title: "Tour Stage | Golden Era Sports Tour",
    };
  }

  return {
    title: `${event.city} | Golden Era Sports Tour`,
    description: event.shortDescription,
  };
}

export default async function TourStagePage({ params }: TourStagePageProps) {
  const { slug } = await params;
  const event = getTourStageBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <PublicPageShell heroTone="light">
      <TourStageLanding event={event} />
    </PublicPageShell>
  );
}
