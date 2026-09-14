import type { Partner } from "@/types/content";

export const partners = [
  {
    id: "milano-restaurant-group",
    name: "Milano Restaurant Group",
    type: "official-partner",
    status: "active",
    logo: "/images/partners/milano-restaurant-group.png",
    logoWidth: 658,
    logoHeight: 324,
    website: "http://www.milanorestaurantgroup.com",
    featuredImage: "/images/partners/milano-restaurant-group-partner.jpg",
    featuredImageWidth: 1130,
    featuredImageHeight: 1340,
  },
  {
    id: "heroes",
    name: "HEROE'S",
    type: "official-partner",
    status: "active",
    logo: "/images/partners/heroes.png",
    logoWidth: 383,
    logoHeight: 114,
    website: "https://www.heroesbrandsport.com",
    featuredImage: "/images/partners/heroespartner.jpg",
    featuredImageWidth: 1053,
    featuredImageHeight: 1579,
  },
  {
    id: "sembrancher",
    name: "SEMBRANCHER",
    type: "official-partner",
    status: "active",
    logo: "/images/partners/sembrancher.png",
    logoWidth: 1366,
    logoHeight: 768,
    website: "https://sembrancher.com",
    featuredImage: "/images/partners/sembrancherpartner.jpg",
    featuredImageWidth: 1600,
    featuredImageHeight: 2400,
  },
] satisfies Partner[];

export const activeOfficialPartners = partners.filter(
  (partner) => partner.type === "official-partner" && partner.status === "active",
);
