import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const locales = ["en", "fr", "it"] as const;
const isDevelopment = process.env.NODE_ENV === "development";

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  ...(isDevelopment ? ["'unsafe-eval'"] : []),
].join(" ");

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "object-src 'none'",
  `script-src ${scriptSources}`,
  "style-src 'self' 'unsafe-inline'",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

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
  poweredByHeader: false,
  images: {
    qualities: [75, 82],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
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
