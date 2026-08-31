export const navigationItems = [
  { label: "The Concept", href: "/the-concept" },
  { label: "Tour", href: "/tour" },
  { label: "Experience", href: "/experience" },
  { label: "The Collection", href: "/collection" },
  { label: "Partners", href: "/partners" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryNavigationCta = {
  label: "Join the Tour",
  href: "/join",
} as const;

export const futureCommerceRoutes = [
  "/shop",
  "/shop/[category]",
  "/product/[slug]",
] as const;
