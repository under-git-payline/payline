import Image from "next/image";
import Button from "../../ui/Button";
import { HeroLayoutData, FlexibleContentProps } from "@/types/acf";

interface HeroProps extends FlexibleContentProps {
  data?: HeroLayoutData;
}

export default function Hero({ data }: HeroProps) {
  // Fallback to default values if no data is provided
  const heroData = {
    tag: data?.tag || "",
    title: data?.title || "",
    description: data?.description || "",
    image: {
      sourceUrl: data?.image?.node?.sourceUrl || "/images/hero-image.png",
      altText: data?.image?.node?.altText || "Hero Image"
    },
    cta: {
      title: data?.cta?.title || "Get Started",
      url: data?.cta?.url || "#"
    },
  };

  return (
    <div className="container flex flex-col-reverse lg:flex-row items-center justify-between gap-10 pt-10 px-10 lg:py-10 bg-brand-gradient text-white rounded-4xl mb-10">
      <div className="flex flex-col gap-10 lg:max-w-1/2 pb-10 lg:p-10">
        <div className="flex flex-col gap-3">
          <span className="w-fit text-sm/6 font-light py-1 px-3 bg-black/10 rounded-sm">
            {heroData.tag}
          </span>
          <h1 className="text-white font-heading text-4xl md:text-6xl/18 font-bold tracking-[-0.5px]">
            {heroData.title}
          </h1>
          <p className="text-lg">
            {heroData.description}
          </p>
        </div>
        <div className="flex gap-4 md:items-center flex-col md:flex-row">
          <a href={heroData.cta.url}>
            <Button variant="secondary">
              {heroData.cta.title}
            </Button>
          </a>
        </div>
      </div>
      <Image
        src={heroData.image.sourceUrl}
        alt={heroData.image.altText}
        width={620}
        height={465}
        className="rounded-l-lg"
      />
    </div>
  );
}