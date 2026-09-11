import { contactDetails } from "@/data/contact";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

export function getWebsiteStructuredData() {
  const siteUrl = getSiteUrl();
  const organizationId = new URL("/#organization", siteUrl).toString();
  const websiteId = new URL("/#website", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Golden Era Sports Tour",
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
