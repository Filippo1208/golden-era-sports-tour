import { tourOverviewStages } from "@/data/events";

export const genderOptions = ["male", "female"] as const;

export const tennisLevelOptions = [
  "recreational",
  "intermediate",
  "advancedAmateur",
  "competitiveAmateur",
  "formerCompetitivePlayer",
] as const;

export const playingHandOptions = ["rightHanded", "leftHanded"] as const;

export const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const referralSourceOptions = [
  "instagram",
  "friendInvitation",
  "tennisClub",
  "event",
  "pressMedia",
  "googleWebSearch",
  "other",
] as const;

export const joinApplicationEvents = tourOverviewStages.filter(
  (event) =>
    event.confirmed && !event.completed && event.applicationsOpen,
);

export type JoinApplicationEventOption = {
  value: string;
  label: string;
};
