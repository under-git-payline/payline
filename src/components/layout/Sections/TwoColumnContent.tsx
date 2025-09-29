import Image from "next/image";
import Button from "../../ui/Button";
import { TwoColumnContentLayoutData, FlexibleContentProps } from "@/types/acf";

interface TwoColumnContentProps extends FlexibleContentProps {
  data?: TwoColumnContentLayoutData;
}

export default function TwoColumnContent({ data }: TwoColumnContentProps) {
  const content = (
    <div className={`container flex flex-col lg:flex-row items-center justify-start gap-16 rounded-4xl my-10 ${data?.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
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
            <h2 className="text-3xl md:text-5xl leading-14 max-w-[550px] self-start">
              {data.title}
            </h2>
          )}
          {data?.content && (
            <div className="text-lg text-[#343C50] [&_strong]:font-bold [&_small]:text-[16px] [&_h4]:mt-4" dangerouslySetInnerHTML={{ __html: data.content }} />
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
    <div className="bg-[#F9F9FA] py-10">
      {content}
    </div>
  ) : (
    content
  );
}