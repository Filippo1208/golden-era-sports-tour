import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

export function getLocalizedPath(locale: AppLocale, pathname = "/") {
  const normalizedPathname = pathname === "/" ? "" : pathname;

  return `/${locale}${normalizedPathname}`;
}

export function getLanguageAlternates(pathname = "/") {
  return {
    en: getLocalizedPath("en", pathname),
    fr: getLocalizedPath("fr", pathname),
    it: getLocalizedPath("it", pathname),
    "x-default": getLocalizedPath(routing.defaultLocale, pathname),
  };
}

export function getAbsoluteLanguageAlternates(pathname = "/") {
  const siteUrl = getSiteUrl();

  return Object.fromEntries(
    Object.entries(getLanguageAlternates(pathname)).map(
      ([language, localizedPath]) => [
        language,
        new URL(localizedPath, siteUrl).toString(),
      ],
    ),
  );
}

type LocalizedMetadataInput = {
  locale: AppLocale;
  pathname?: string;
  title: string;
  description?: string;
};

export function getLocalizedMetadata({
  locale,
  pathname = "/",
  title,
  description,
}: LocalizedMetadataInput): Metadata {
  const canonicalUrl = new URL(
    getLocalizedPath(locale, pathname),
    getSiteUrl(),
  ).toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getAbsoluteLanguageAlternates(pathname),
    },
  };
}
