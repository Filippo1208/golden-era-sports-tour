import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

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
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: getLocalizedPath(locale, pathname),
      languages: getLanguageAlternates(pathname),
    },
  };
}
