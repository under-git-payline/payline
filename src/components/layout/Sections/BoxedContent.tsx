import Image from "next/image";
// import Button from "../../ui/Button";
import { BoxedContentLayoutData, FlexibleContentProps } from "@/types/acf";

interface BoxedContentProps extends FlexibleContentProps {
  data?: BoxedContentLayoutData;
}

export default function BoxedContent({ data }: BoxedContentProps) {
  return (
    <div className="boxed-content-block container flex flex-col lg:flex-row items-center justify-start gap-16 rounded-4xl mx-14 p-10 bg-black/3">
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
      <div className="flex flex-col gap-10 w-1/2 items-start">
        <div className="flex flex-col gap-2 items-start">
          {/* {data?.tag && (
            <span className="w-fit text-sm/6 font-light py-1 px-3 bg-black/10 rounded-sm">
              {data.tag}
            </span>
          )} */}
          {data?.title && (
            <h2 className="text-3xl md:text-5xl leading-14 max-w-[550px] self-start">
              {data.title}
            </h2>
          )}
          {data?.content && (
            <div className="text-lg text-[#343C50]" dangerouslySetInnerHTML={{ __html: data.content }} />
          )}
        </div>
        {/* {data?.cta && (
          <div className="flex gap-4 md:items-center flex-col md:flex-row">
            <a href={data.cta.url}>
              <Button variant="black">
                {data.cta.title}
              </Button>
            </a>
          </div>
        )} */}
      </div>
    </div>
  );
}