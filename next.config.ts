import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const locales = ["en", "fr", "it"] as const;

const localizedLegacyRedirects = locales.flatMap((locale) => [
  {
    source: `/${locale}/destinations`,
    destination: `/${locale}/tour`,
    permanent: true,
  },
  {
    source: `/${locale}/golden-era`,
    destination: `/${locale}/the-concept`,
    permanent: true,
  },
  {
    source: `/${locale}/discover-the-tour`,
    destination: `/${locale}/tour`,
    permanent: true,
  },
]);

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 82],
  },
  async redirects() {
    return [
      {
        source: "/destinations",
        destination: "/en/tour",
        permanent: true,
      },
      {
        source: "/golden-era",
        destination: "/en/the-concept",
        permanent: true,
      },
      {
        source: "/discover-the-tour",
        destination: "/en/tour",
        permanent: true,
      },
      ...localizedLegacyRedirects,
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
