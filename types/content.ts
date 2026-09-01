export type EventStatus = "completed" | "upcoming";

export type TourEventScheduleItem = {
  id: string;
  dayLabel: string;
  dateLabel?: string;
  timeLabel?: string;
  title: string;
  description?: string;
};

export type TourEventPricing = {
  standardPrice: string;
  standardLabel: string;
  memberPrice?: string;
  memberLabel?: string;
  note?: string;
  guestPolicy?: string;
};

export type TourEventFormatTeaser = {
  eyebrow: string;
  headline: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
};

export type TourEventLandingContent = {
  eyebrow: string;
  editionLabel: string;
  dateLabel: string;
  heroVenueLabel: string;
  tournamentLabel?: string;
  tournamentDateLabel?: string;
  tournamentTimeLabel?: string;
  heroPrimaryCta: {
    label: string;
    href: string;
  };
  heroSecondaryCta?: {
    label: string;
    href: string;
  };
  programmeTitle: string;
  programmeIntro: string;
  schedule: TourEventScheduleItem[];
  experienceEyebrow: string;
  experienceHeadline: string;
  experienceCopy: string;
  includedItems: string[];
  pricing: TourEventPricing;
  formatTeaser: TourEventFormatTeaser;
  finalCta: {
    cityLabel: string;
    dateLabel: string;
    venueLabel: string;
    headline: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export type TourEvent = {
  id: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  venue?: string;
  startDate: string;
  endDate?: string;
  countdownTarget?: string;
  status: EventStatus;
  shortDescription: string;
  heroImage?: string | null;
  heroVideoDesktop?: string | null;
  heroVideoMobile?: string | null;
  posterImage?: string | null;
  ctaLabel: string;
  ctaHref: string;
  capacity?: string;
  entryFee?: string;
  included?: string[];
  trainingSession?: {
    day: string;
    time: string;
    note: string;
  };
  landingContent?: TourEventLandingContent;
};

export type TourOverviewStatus =
  | "Completed"
  | "Next Stage"
  | "Upcoming"
  | "TBC"
  | "Finals";

export type TourOverviewLayout =
  | "full-bleed"
  | "edge-right"
  | "panorama"
  | "edge-left"
  | "finale";

export type TourOverviewStage = {
  id: string;
  slug: string;
  order: number;
  city: string;
  country: string;
  dateLabel: string;
  venue?: string;
  status: TourOverviewStatus;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  href: string;
  pageAvailable: boolean;
  year: number;
  supportingLine: string;
  layout: TourOverviewLayout;
};

export type Destination = {
  id: string;
  slug: string;
  name: string;
  country: string;
  shortDescription: string;
  heroImage?: string | null;
  heroVideo?: string | null;
  eventIds: string[];
};

export type Racquet = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year?: number;
  decade?: string;
  material?: string;
  shortDescription: string;
  mainImage?: string | null;
  detailImages?: string[];
};

export type PartnerType =
  | "official-partner"
  | "tour-partner"
  | "stage-partner"
  | "supplier";

export type PartnerStatus = "active" | "inactive";

export type Partner = {
  id: string;
  name: string;
  type: PartnerType;
  status: PartnerStatus;
  logo?: string | null;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  website: string;
  shortDescription?: string;
  partnershipRole?: string;
  stageAssociation?: string[];
  featuredImage?: string | null;
  featuredImageAlt?: string;
  featuredImageWidth?: number;
  featuredImageHeight?: number;
};
