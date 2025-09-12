import { FlexibleContentProps, FeatureBoxesLayoutData } from "@/types/acf";

interface FeatureBoxesProps extends FlexibleContentProps {
  data?: FeatureBoxesLayoutData;
}

export default function FeatureBoxes({ data }: FeatureBoxesProps) {
  if (!data) return null;

  const content = (
    <div className="feature-boxes container py-10 text-[#010B24]">
      {data?.title && <h2 className="text-5xl leading-14 mb-2">{data.title}</h2>}
      {data?.subtitle && <p className="text-lg text-[#343C50]">{data.subtitle}</p>}
      {data?.boxes && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {data.boxes.map((box, index) => (
            <div key={index} className="bg-black/3 rounded-2xl p-5 pb-14">
              <div className="flex flex-col gap-2 pt-4">
                <h3 className="text-2xl">{box.title}</h3>
                <p className="text-lg text-[#343C50]">{box.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return !data?.removeBackground ? (
    <div className="bg-[#F9F9FA] py-10 my-10">
      {content}
    </div>
  ) : (
    content
  );
}
