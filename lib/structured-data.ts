import { contactDetails } from "@/data/contact";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";
import type { TourEvent } from "@/types/content";

type SportsEventStructuredDataInput = {
  canonicalPath: string;
  event: TourEvent;
  location: {
    address: {
      addressCountry: string;
      addressLocality: string;
      postalCode: string;
      streetAddress: string;
    };
    name: string;
  };
  name: string;
  sport: string;
};

function getOrganizationId(siteUrl: URL) {
  return new URL("/#organization", siteUrl).toString();
}

export function getWebsiteStructuredData() {
  const siteUrl = getSiteUrl();
  const organizationId = getOrganizationId(siteUrl);
  const websiteId = new URL("/#website", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Golden Era Sports Tour",
        description:
          "Golden Era Sports Tour is an international amateur tennis experience combining competitive tennis, iconic destinations, hospitality and networking through exclusive events around the world.",
        legalName: "Vintage Events Montecarlo S.r.l.s.",
        url: siteUrl.toString(),
        logo: new URL(
          "/images/brand/goldeneralogo.png",
          siteUrl,
        ).toString(),
        email: contactDetails.email,
        sameAs: [contactDetails.instagramUrl],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Largo Francesco Richini 2",
          postalCode: "20122",
          addressLocality: "Milano",
          addressCountry: "IT",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Golden Era Sports Tour",
        url: siteUrl.toString(),
        inLanguage: [...routing.locales],
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };
}

export function getSportsEventStructuredData({
  canonicalPath,
  event,
  location,
  name,
  sport,
}: SportsEventStructuredDataInput) {
  const siteUrl = getSiteUrl();
  const eventUrl = new URL(canonicalPath, siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `${eventUrl}#sports-event`,
    name,
    description: event.shortDescription,
    url: eventUrl,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    sport,
    ...(event.heroImage
      ? { image: new URL(event.heroImage, siteUrl).toString() }
      : {}),
    location: {
      "@type": "Place",
      name: location.name,
      address: {
        "@type": "PostalAddress",
        ...location.address,
      },
    },
    organizer: {
      "@id": getOrganizationId(siteUrl),
    },
  };
}
