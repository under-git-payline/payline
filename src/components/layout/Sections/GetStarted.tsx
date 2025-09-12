import Image from "next/image";
import { FlexibleContentProps, GetStartedLayoutData } from "@/types/acf";
import Button from "@/components/ui/Button";
import Calendar from "@/components/icons/Calendar";

interface GetStartedProps extends FlexibleContentProps {
  data?: GetStartedLayoutData;
}

export default function GetStarted({ data }: GetStartedProps) {
  if (!data) return null;

  return (
    <div className="container flex flex-col lg:flex-row items-center justify-between gap-10 py-20 px-10 lg:py-5 bg-brand-gradient text-white rounded-4xl lg:mt-10 lg:mb-10">
      <div className="flex flex-col gap-5 lg:max-w-1/2">
        <div className="flex flex-col gap-3">
          <span className="w-fit text-sm/6 font-light py-1 px-3 bg-black/10 rounded-sm">
            {data.tag}
          </span>
          <h1 className="text-white font-heading text-4xl md:text-5xl/10">
            {data.title}
          </h1>
          <p className="text-lg">
            {data.subtitle}
          </p>
        </div>
        <div className="flex gap-4 md:items-center flex-col md:flex-row">
          <a href={data.ctaWhite.url}>
            <Button variant="secondary">
              {data.ctaWhite.title}
            </Button>
          </a>
          {data.ctaBlue && (
            <a href={data.ctaBlue.url}>
              <Button variant="transparent">
                <Calendar /> {data.ctaBlue.title}
              </Button>
            </a>
          )}
        </div>
      </div>
      <Image
        src={data.image.node.sourceUrl}
        alt={data.image.node.altText}
        width={620}
        height={465}
        className="transform translate-x-10 translate-y-5 hidden lg:block"
      />
    </div>
  );
}
