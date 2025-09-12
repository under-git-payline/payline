import FlexiblePageBuilder from "@/components/FlexibleContent/FlexiblePageBuilder";
import { getPageBlocks } from "@/lib/queries";
import BlogSlider from "@/components/layout/Sections/BlogSlider";
import CalculatorSection from "@/components/layout/Sections/CalculatorSection";
import CardsSection from "@/components/layout/Sections/CardsSection";
import Hero from "@/components/layout/Sections/HomepageHero";
import TeamSection from "@/components/layout/Sections/TeamSection";
import TestimonialsSection from "@/components/layout/Sections/TestimonialsSection";
import TrustedByIcons from "@/components/layout/Sections/TrustedByIcons";

export default async function Home() {
  // Fetch page blocks from WordPress ACF flexible content
  const blocks = await getPageBlocks('homepage');

  // Fallback to static layout if no blocks are found
  if (blocks.length === 0) {
    return (
      <>
        <Hero/>
        <TrustedByIcons/>
        <CardsSection/>
        <CalculatorSection/>
        <TestimonialsSection/>
        <TeamSection/>
        <BlogSlider/>
      </>
    );
  }

  return <FlexiblePageBuilder blocks={blocks} />;
}
