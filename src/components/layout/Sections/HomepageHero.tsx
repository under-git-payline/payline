import Image from "next/image";
import Button from "../../ui/Button";
import Calendar from "../../icons/Calendar";
import { HomepageHeroLayoutData, FlexibleContentProps } from "@/types/acf";

interface HeroProps extends FlexibleContentProps {
  data?: HomepageHeroLayoutData;
}

export default function HomepageHero({ data }: HeroProps) {
  // Fallback to default values if no data is provided
  const heroData = {
    tag: data?.tag || "Join the more than 20,000 happy Payline customers",
    title: data?.title || "— Payments Designed for your Business",
    subtitle: data?.subtitle || "Affordable payments in person, online & mobile",
    image: {
      sourceUrl: data?.image?.node?.sourceUrl || "/images/hero-image.png",
      altText: data?.image?.node?.altText || "Hero Image"
    },
    primaryCta: {
      title: data?.primaryCta?.title || "",
      url: data?.primaryCta?.url || ""
    },
    secondaryCta: {
      title: data?.secondaryCta?.title || "",
      url: data?.secondaryCta?.url || ""
    }
  };

  return (
    <div className="container flex flex-col lg:flex-row items-center justify-between gap-10 pt-20 lg:py-20 bg-brand-gradient text-white rounded-4xl mb-10">
      <div className="flex flex-col gap-10 lg:max-w-1/2 px-10">
        <div className="flex flex-col gap-3">
          <span className="w-fit text-sm/6 font-light py-1 px-3 bg-black/10 rounded-sm">
            {heroData.tag}
          </span>
          <h1 className="text-white font-heading text-4xl md:text-7xl/18 font-bold tracking-[-0.5px] uppercase">
            {heroData.title}
          </h1>
          <p className="text-2xl">
            {heroData.subtitle}
          </p>
        </div>
        <div className="divider max-w-[540px]"></div>
        <div className="flex gap-4 md:items-center flex-col md:flex-row">
          {heroData.primaryCta.url && (
          <a href={heroData.primaryCta.url}>
            <Button variant="secondary">
              {heroData.primaryCta.title}
            </Button>
          </a>
          )}
          {heroData.secondaryCta.url && (
          <>
            <span className="self-center">or</span>
            <a href={heroData.secondaryCta.url}>
              <Button variant="transparent">
                <Calendar /> {heroData.secondaryCta.title}
              </Button>
            </a>
          </>
          )}
        </div>
      </div>
      <Image
        src={heroData.image.sourceUrl}
        alt={heroData.image.altText}
        width={600}
        height={400}
        className="rounded-l-lg shadow-lg bg-white/10"
        quality={100} // prevent compression
        priority // for above-the-fold images
      />
    </div>
  );
}