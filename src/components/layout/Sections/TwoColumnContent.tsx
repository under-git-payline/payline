import Image from "next/image";
import Button from "../../ui/Button";
import ArrowRight from "../../icons/ArrowRight";
import { TwoColumnContentLayoutData, FlexibleContentProps } from "@/types/acf";

interface TwoColumnContentProps extends FlexibleContentProps {
  data?: TwoColumnContentLayoutData;
}

export default function TwoColumnContent({ data, isFirst }: TwoColumnContentProps) {
  if (isFirst) {
    return (
      <section className="bg-[#002132] text-white">
        <div
          className={`container flex flex-col gap-5 px-4! pt-[114px] pb-10 lg:items-center lg:gap-10 lg:px-10! lg:pt-[120px] lg:pb-20 ${data?.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
        >
          {data?.image && (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[20px] lg:flex-1">
              <Image
                src={data.image.node.sourceUrl}
                alt={data.image.node.altText || data.title || ""}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-3 lg:flex-1">
            <div className="flex flex-col gap-1.5">
              {data?.tag && (
                <span className="w-fit rounded-sm bg-white/8 px-2 py-0.5 text-sm/6 font-normal lg:px-3 lg:py-1">
                  {data.tag}
                </span>
              )}
              {data?.title && (
                <h1
                  className="text-[32px] leading-[42px] font-medium tracking-[-1px] lg:text-[60px] lg:leading-[66px]"
                  dangerouslySetInnerHTML={{ __html: data.title }}
                />
              )}
            </div>
            {data?.content && (
              <div
                className="text-[18px] leading-[26px] text-white/80 lg:text-xl lg:leading-7 [&_p]:mb-7 [&_p:last-child]:mb-0 [&_strong]:font-medium [&_strong]:text-white [&_a]:text-[#B0E0F9] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}
            {Boolean(data?.cta?.url && data?.cta?.title) && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a href={data!.cta.url} className="block w-full md:w-auto">
                  <Button variant="heroPrimary">
                    {data!.cta.title}
                    <ArrowRight fill="currentColor" />
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  const content = (
    <div className={`two-column-content container flex flex-col lg:flex-row items-center justify-start gap-16 rounded-4xl my-10 ${data?.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
      {data?.image && (
        <div className="lg:w-1/2">
          <Image
            src={data?.image.node.sourceUrl}
            alt={data?.image.node.altText}
            width={660}
            height={495}
            className="rounded-l-lg"
          />
        </div>
      )}
      <div className="flex flex-col gap-10 lg:w-1/2 items-start">
        <div className="flex flex-col gap-2 items-start">
          {data?.tag && (
            <span className="w-fit text-sm/6 font-light py-1 px-3 bg-black/10 rounded-sm">
              {data.tag}
            </span>
          )}
          {data?.title && (
            <h2
              className="text-3xl md:text-5xl leading-14 max-w-[580px] self-start [&_strong]:text-[#018DD7] [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          )}
          {data?.content && (
            <div className="text-xl text-[#343C50] [&_strong]:font-bold [&_small]:text-[16px] [&_h4]:mt-4" dangerouslySetInnerHTML={{ __html: data.content }} />
          )}
        </div>
        {data?.cta && (
          <div className="flex gap-4 md:items-center flex-col md:flex-row">
            <a href={data.cta.url}>
              <Button variant="black">
                {data.cta.title}
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return data?.background ? (
    <div className="bg-[#f4f4f5] py-10">
      {content}
    </div>
  ) : (
    content
  );
}
