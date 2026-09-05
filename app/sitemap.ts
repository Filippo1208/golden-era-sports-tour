import type { MetadataRoute } from "next";

import { tourEvents, tourOverviewStages } from "@/data/events";
import { routing } from "@/i18n/routing";
import {
  getAbsoluteLanguageAlternates,
  getLocalizedPath,
} from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

const localizedPublicPages = [
  { pathname: "/", changeFrequency: "weekly" },
  { pathname: "/the-concept", changeFrequency: "monthly" },
  { pathname: "/tour", changeFrequency: "weekly" },
  { pathname: "/experience", changeFrequency: "monthly" },
  { pathname: "/collection", changeFrequency: "monthly" },
  { pathname: "/partners", changeFrequency: "monthly" },
  { pathname: "/team", changeFrequency: "monthly" },
  { pathname: "/contact", changeFrequency: "yearly" },
  { pathname: "/join", changeFrequency: "monthly" },
  { pathname: "/privacy", changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const publicStagePages = tourOverviewStages
    .filter(
      (stage) =>
        stage.pageAvailable &&
        tourEvents.some(
          (event) => event.slug === stage.slug && Boolean(event.landingContent),
        ),
    )
    .map((stage) => ({
      pathname: `/tour/${stage.slug}`,
      changeFrequency: "weekly" as const,
    }));

  const localizedPages = [...localizedPublicPages, ...publicStagePages];

  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "weekly",
    },
    ...localizedPages.flatMap(({ pathname, changeFrequency }) =>
      routing.locales.map((locale) => ({
        url: new URL(getLocalizedPath(locale, pathname), siteUrl).toString(),
        changeFrequency,
        alternates: {
          languages: getAbsoluteLanguageAlternates(pathname),
        },
      })),
    ),
  ];
}
