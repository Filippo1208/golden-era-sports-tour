import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const requestedLocale = await rootParams.locale();

    if (!hasLocale(routing.locales, requestedLocale)) {
      notFound();
    }

    locale = requestedLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

