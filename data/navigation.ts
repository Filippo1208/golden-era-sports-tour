export const navigationItems = [
  { labelKey: "concept", href: "/the-concept" },
  { labelKey: "tour", href: "/tour" },
  { labelKey: "experience", href: "/experience" },
  { labelKey: "collection", href: "/collection" },
  { labelKey: "partners", href: "/partners" },
  { labelKey: "team", href: "/team" },
  { labelKey: "contact", href: "/contact" },
] as const;

export const primaryNavigationCta = {
  href: "/join",
} as const;

export const futureCommerceRoutes = [
  "/shop",
  "/shop/[category]",
  "/product/[slug]",
] as const;
