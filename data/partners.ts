import type { Partner } from "@/types/content";

export const partners = [
  {
    id: "heroes",
    name: "HEROE'S",
    type: "official-partner",
    status: "active",
    logo: "/images/partners/heroes.png",
    logoAlt: "HEROE'S official partner logo",
    logoWidth: 383,
    logoHeight: 114,
    website: "https://www.heroesbrandsport.com",
    shortDescription: "A sportswear partner within the Golden Era Sports Tour.",
    featuredImage: "/images/partners/heroespartner.jpg",
    featuredImageAlt:
      "Golden Era tennis portrait featuring HEROE'S sportswear and a vintage racquet",
    featuredImageWidth: 1053,
    featuredImageHeight: 1579,
  },
  {
    id: "sembrancher",
    name: "SEMBRANCHER",
    type: "official-partner",
    status: "active",
    logo: "/images/partners/sembrancher.png",
    logoAlt: "Sembrancher official partner logo",
    logoWidth: 1366,
    logoHeight: 768,
    website: "https://sembrancher.com",
    shortDescription:
      "Sembrancher joins the Golden Era environment as an official partner, connecting its identity with the Tour's international tennis experience.",
    featuredImage: "/images/partners/sembrancherpartner.jpg",
    featuredImageAlt:
      "Sembrancher bottle photographed with tennis balls and a wooden tennis racquet",
    featuredImageWidth: 1600,
    featuredImageHeight: 2400,
  },
] satisfies Partner[];

export const activeOfficialPartners = partners.filter(
  (partner) => partner.type === "official-partner" && partner.status === "active",
);
