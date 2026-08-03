import { HeroLayoutData } from "@/types/acf";

export type HeroCardKind = "form" | "iframe" | "calculator" | null;

export function getHeroCardKind(data?: Partial<HeroLayoutData>): HeroCardKind {
  if (data?.addForm && data?.formId) return "form";
  if (data?.addIframe && data?.iframeUrl) return "iframe";
  if (data?.addCalculator) return "calculator";
  return null;
}

export function isFeatureHero(data?: Partial<HeroLayoutData>): boolean {
  return getHeroCardKind(data) !== null;
}

/**
 * Heroes that render on the light sky background rather than the dark one:
 * the "Feature Hero" (form/iframe/calculator card) and the bare centred hero
 * that carries no image and no card.
 */
export function isLightHero(data?: Partial<HeroLayoutData>): boolean {
  if (isFeatureHero(data)) return true;
  return !data?.image?.node?.sourceUrl;
}
