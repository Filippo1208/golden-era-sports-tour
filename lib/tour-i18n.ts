export const tourStageMessageKeys = {
  "st-moritz": "stMoritz",
  "monte-carlo": "monteCarlo",
  "los-angeles": "losAngeles",
  "sao-paulo": "saoPaulo",
  dubai: "dubai",
} as const;

export type TourStageMessageKey =
  (typeof tourStageMessageKeys)[keyof typeof tourStageMessageKeys];

export function getTourStageMessageKey(slug: string) {
  return tourStageMessageKeys[slug as keyof typeof tourStageMessageKeys] ?? null;
}
