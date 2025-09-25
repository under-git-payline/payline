import BlogSlider from "@/components/layout/Sections/BlogSlider";
import CalculatorSection from "../layout/Sections/CalculatorSection";
import CardsSection from "@/components/layout/Sections/CardsSection";
import HomepageHero from "@/components/layout/Sections/HomepageHero";
import TeamSection from "@/components/layout/Sections/TeamSection";
import TestimonialsSection from "@/components/layout/Sections/TestimonialsSection";
import TrustedByIcons from "@/components/layout/Sections/TrustedByIcons";
import Hero from "@/components/layout/Sections/Hero";
import ProductCards from "@/components/layout/Sections/ProductCards";
import FeatureCards from "@/components/layout/Sections/FeatureCards";
import OverlappingImages from "@/components/layout/Sections/OverlappingImages";
import FeatureBoxes from "@/components/layout/Sections/FeatureBoxes";
import ExploreSolutions from "@/components/layout/Sections/ExploreSolutions";
import GetStarted from "@/components/layout/Sections/GetStarted";
import TwoColumnContent from "@/components/layout/Sections/TwoColumnContent";
import FreeContent from "@/components/layout/Sections/FreeContent";
import BoxedContent from "@/components/layout/Sections/BoxedContent";
import JourneyTimeline from "@/components/layout/Sections/JourneyTimeline";
import CenteredCards from "@/components/layout/Sections/CenteredCards";
import DarkCta from "@/components/layout/Sections/DarkCta";
import Faqs from "@/components/layout/Sections/Faqs";
import ComparisonTable from "@/components/layout/Sections/ComparisonTable";
import MultiStepForm from "@/components/layout/Sections/MultiStepForm";

interface PageBlock {
  fieldGroupName?: string;
  __typename?: string;
  // [key: string]: any;
}

interface FlexiblePageBuilderProps {
  blocks: PageBlock[];
}

interface ComponentProps {
  data?: PageBlock;
}

const componentMap: Record<string, React.ComponentType<ComponentProps>> = {
  'PageBlocksPageBlocksHomepageHeroLayout': HomepageHero as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksTrustedByLayout': TrustedByIcons as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksCardsSectionLayout': CardsSection as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksCalculatorSectionLayout': CalculatorSection as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksCustomerTestimonialsLayout': TestimonialsSection as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksOurTeamLayout': TeamSection as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksBlogSliderLayout': BlogSlider as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksHeroLayout': Hero as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksProductCardsLayout': ProductCards as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksFeatureCardsLayout': FeatureCards as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksOverlappingImagesLayout': OverlappingImages as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksFeatureBoxesLayout': FeatureBoxes as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksExploreSolutionsLayout': ExploreSolutions as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksGetStartedLayout': GetStarted as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksTwoColumnContentLayout': TwoColumnContent as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksFreeContentLayout': FreeContent as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksBoxedContentLayout': BoxedContent as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksJourneyTimelineLayout': JourneyTimeline as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksCenteredCardsLayout': CenteredCards as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksDarkCtaLayout': DarkCta as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksFaqsLayout': Faqs as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksComparisonTableLayout': ComparisonTable as React.ComponentType<ComponentProps>,
  'PageBlocksPageBlocksMultiStepFormLayout': MultiStepForm as React.ComponentType<ComponentProps>,
};

export default function FlexiblePageBuilder({ blocks }: FlexiblePageBuilderProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        // Use fieldGroupName if available, otherwise use __typename
        const blockType = block.fieldGroupName || block.__typename;
        const Component = componentMap[blockType as keyof typeof componentMap];
        
        if (!Component) {
          console.warn(`Unknown block type: ${blockType}`);
          return null;
        }

        return <Component key={index} data={block} />;
      })}
    </>
  );
}
