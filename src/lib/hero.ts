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
