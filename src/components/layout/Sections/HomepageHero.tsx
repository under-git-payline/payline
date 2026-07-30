import Image from "next/image";
import Button from "../../ui/Button";
import Calendar from "../../icons/Calendar";
import ArrowRight from "../../icons/ArrowRight";
import { HomepageHeroLayoutData, FlexibleContentProps } from "@/types/acf";

interface HeroProps extends FlexibleContentProps {
  data?: HomepageHeroLayoutData;
}

export default function HomepageHero({ data }: HeroProps) {
  const heroData = {
    tag: data?.tag || "Join the more than 20,000 happy Payline customers",
    title: data?.title || "Payments Infrastructure for Growing Businesses",
    subtitle: data?.subtitle || "Accept payments, increase revenue, and scale with a modern platform built for merchants, software companies, and sales partners.",
    image: {
      sourceUrl: data?.image?.node?.sourceUrl || "/images/hero-image.png",
      altText: data?.image?.node?.altText || "Payments dashboard preview",
      width: data?.image?.node?.mediaDetails?.width || 1126,
      height: data?.image?.node?.mediaDetails?.height || 563,
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
    <section className="homepage-hero-clouds relative overflow-hidden pb-10 pt-[114px] lg:pb-12 lg:pt-[120px]">
      <div className="container relative z-10 flex flex-col items-center gap-6 px-4! md:gap-10 md:px-5! lg:gap-10 lg:px-10!">
        <div className="flex w-full max-w-[893px] flex-col items-center gap-2 text-center text-[#040405] md:gap-3">
          <span className="rounded bg-black/4 px-3 py-1 text-sm leading-6 font-normal">
            {heroData.tag}
          </span>
          <h1 className="font-inter-tight text-[32px] font-medium leading-[0.95] tracking-[-1px] sm:text-[40px] md:text-7xl md:leading-none lg:text-[80px] lg:leading-[0.98] lg:tracking-[-2px]">
            {heroData.title}
          </h1>
          <p className="max-w-[760px] text-[17px] leading-[1.45] text-black/80 md:text-xl md:leading-7">
            {heroData.subtitle}
          </p>
        </div>

        <div className="flex w-full max-w-[343px] flex-col items-center justify-center gap-3 md:max-w-none md:flex-row">
          {heroData.primaryCta.url && (
            <a href={heroData.primaryCta.url} className="block w-full md:w-auto">
              <Button variant="heroPrimary">
                {heroData.primaryCta.title}
                <ArrowRight fill="currentColor" />
              </Button>
            </a>
          )}
          {heroData.secondaryCta.url && (
            <a href={heroData.secondaryCta.url} className="block w-full md:w-auto">
              <Button variant="heroSecondary">
                <Calendar />
                {heroData.secondaryCta.title}
              </Button>
            </a>
          )}
        </div>

        <div className="w-full max-w-[343px] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(255,255,255,0.56)_100%)] shadow-[0_24px_80px_rgba(4,4,5,0.08)] ring-1 ring-white/80 md:max-w-[1126px]">
          <Image
            src={heroData.image.sourceUrl}
            alt={heroData.image.altText}
            width={heroData.image.width}
            height={heroData.image.height}
            className="h-auto w-full"
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  );
}