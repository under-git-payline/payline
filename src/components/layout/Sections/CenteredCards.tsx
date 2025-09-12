import { FlexibleContentProps, CenteredCardsLayoutData } from "@/types/acf";

interface CenteredCardsProps extends FlexibleContentProps {
  data?: CenteredCardsLayoutData;
}

export default function CenteredCards({ data }: CenteredCardsProps) {
  if (!data) return null;

  return (
    <div className="my-14 text-[#010B24]">
      <div className="container py-20 text-center">
        {data?.tag && (
          <span className="w-fit text-sm/6 font-light py-1 px-3 bg-black/10 rounded-sm">
            {data.tag}
          </span>
        )}
        {data?.title && <h2 className="text-5xl leading-14 mb-2">{data.title}</h2>}
        {data?.description && <p className="text-lg text-[#343C50]">{data.description}</p>}
        {data?.centerCard && (
          <div className="flex align-center justify-center gap-6 mt-10 max-w-6xl mx-auto">
            {data.centerCard.map((card, index) => (
              <div key={index} className="bg-black/3 lg:w-1/3 rounded-2xl p-5 pb-14 text-center">
                <div className="flex flex-col gap-2 pt-4">
                  <h3 className="text-2xl">{card.title}</h3>
                  <p className="text-lg text-[#343C50]">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
