import Image from "next/image";
import { JourneyTimelineLayoutData, FlexibleContentProps } from "@/types/acf";

interface JourneyTimelineProps extends FlexibleContentProps {
  data?: JourneyTimelineLayoutData;
}

export default function JourneyTimeline({ data }: JourneyTimelineProps) {
  if (!data) return null;

  return (
    <div className="my-14">
      <div className="container mx-14">
        {/* Header Section - Centered */}
        <div className="text-center mb-16">
          {data.tag && (
            <span className="inline-block text-sm/6 font-light py-1 px-3 bg-black/6 rounded-sm mb-4">
              {data.tag}
            </span>
          )}
          {data.title && (
            <h2 className="text-3xl md:text-5xl leading-14 mb-6 max-w-4xl mx-auto">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-lg text-[#343C50] max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* Timeline Section */}
        {data.timeline && data.timeline.length > 0 && (
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b bg-[#676D7C] h-full hidden lg:block"></div>
            
            {data.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative mb-16 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#676D7C] rounded-full z-10 hidden lg:block"></div>
                  
                  {/* Content container */}
                  <div className={`flex flex-col justify-evenly lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Image side */}
                    <div className="lg:w-1/2 flex">
                      {item.image && (
                        <div className="relative">
                          <Image
                            src={item.image.node.sourceUrl}
                            alt={item.image.node.altText || item.title}
                            width={400}
                            height={300}
                            className="rounded-2xl shadow-lg"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Content side */}
                    <div className="lg:w-1/2 flex flex-col gap-4">
                      {item.tag && (
                        <span className="w-fit text-sm/6 font-light py-1 px-3 bg-black/6 rounded-sm">
                          {item.tag}
                        </span>
                      )}
                      {item.title && (
                        <h3 className="text-2xl lg:text-2xl text-[#010B24]">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-lg text-[#343C50] leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}