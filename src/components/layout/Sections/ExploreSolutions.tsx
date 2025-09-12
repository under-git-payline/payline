import Image from "next/image";
import Link from "next/link";
import { FlexibleContentProps, ExploreSolutionsLayoutData } from "@/types/acf";
import Button from "@/components/ui/Button";

interface ExploreSolutionsProps extends FlexibleContentProps {
  data?: ExploreSolutionsLayoutData;
}

export default function ExploreSolutions({ data }: ExploreSolutionsProps) {
  if (!data) return null;

  return (
    <div className="container my-14">
      {data.title && <h2 className="text-4xl mb-2">{data.title}</h2>}
      {data.subtitle && <p className="text-lg text-[#343C50] mb-10">{data.subtitle}</p>}
      
      {data.solutions && data.solutions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.solutions.map((solution, index) => (
            <div key={index} className="overflow-hidden">
              {solution.image && (
                <div>
                  <Image
                    src={solution.image.node.sourceUrl}
                    alt={solution.image.node.altText || data.title || 'Solution Image'}
                    width={solution?.image?.node?.mediaDetails?.width || 0}
                    height={solution?.image?.node?.mediaDetails?.height || 0}
                    className="w-full h-100 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl mb-2">{solution.title}</h3>
                <p className="text-[#343C50] mb-4">{solution.description}</p>
                {solution.cta && (
                  <Button variant="black">
                    <Link
                      href={solution.cta.url}
                      target={solution.cta.target || '_self'}
                    >
                      {solution.cta.title}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
