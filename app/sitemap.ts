import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getLanguageAlternates, getLocalizedPath } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

const publicPaths = [
  "/",
  "/experience",
  "/partners",
  "/team",
  "/contact",
  "/collection",
  "/join",
  "/the-concept",
  "/tour",
  "/tour/monte-carlo",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return publicPaths.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: new URL(getLocalizedPath(locale, pathname), siteUrl).toString(),
      alternates: {
        languages: Object.fromEntries(
          Object.entries(getLanguageAlternates(pathname)).map(
            ([language, localizedPath]) => [
              language,
              new URL(localizedPath, siteUrl).toString(),
            ],
          ),
        ),
      },
    })),
  );
}
