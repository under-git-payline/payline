import Hero from "@/components/layout/Sections/Hero";
import { HeroLayoutData } from "@/types/acf";
import Header from "@/components/layout/Header";
import { isFeatureHero } from "@/lib/hero";

const baseCta = {
  target: "",
  title: "Get Started",
  url: "/signup-today",
  __typename: "AcfLink",
};

const baseSecondaryCta = {
  target: "",
  title: "Contact Sales",
  url: "/contact",
  __typename: "AcfLink",
};

const baseImage = {
  node: {
    altText: "Payments dashboard preview",
    uri: "/images/hero-image.png",
    sourceUrl: "/images/hero-image.png",
    mediaDetails: { width: 1200, height: 900 },
    __typename: "MediaItem",
  },
  __typename: "MediaItemConnectionEdge",
};

function makeHeroData(overrides: Partial<HeroLayoutData>): HeroLayoutData {
  return {
    fieldGroupName: "PageBlocksPageBlocksHeroLayout",
    tag: "Software",
    title: "Enhance Your Platform with Payline Connect",
    description: "Seamless Payment Integration for Software Platforms",
    cta: baseCta,
    secondaryCta: baseSecondaryCta,
    image: baseImage,
    addCalculator: false,
    addForm: false,
    formId: "",
    addIframe: false,
    iframeUrl: "",
    __typename: "PageBlocksPageBlocksHeroLayout",
    ...overrides,
  };
}

const variants: { label: string; data: HeroLayoutData }[] = [
  { label: "Plain text (no image, no card)", data: makeHeroData({ image: { ...baseImage, node: { ...baseImage.node, sourceUrl: "" } } }) },
  { label: "Image only", data: makeHeroData({}) },
  { label: "Form", data: makeHeroData({ addForm: true, formId: "d7309e7f-88e7-470c-b997-f277796706d8" }) },
  { label: "Iframe", data: makeHeroData({ addIframe: true, iframeUrl: "https://example.com" }) },
  { label: "Calculator", data: makeHeroData({ addCalculator: true }) },
  { label: "Calculator + image (precedence check: calculator must win, no image)", data: makeHeroData({ addCalculator: true }) },
];

export default function DevHeroPreviewPage() {
  return (
    <div className="flex flex-col gap-2">
      {variants.map((variant) => {
        const headerVariant = isFeatureHero(variant.data) ? "light" : "dark";
        return (
          <div key={variant.label} className="relative">
            <p className="bg-yellow-200 p-2 font-mono text-sm text-black">
              {variant.label} — headerVariant: {headerVariant}
            </p>
            <div className="relative">
              <Header variant={headerVariant} />
              <Hero data={variant.data} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
