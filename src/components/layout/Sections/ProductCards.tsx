import Image from "next/image";
import Button from "../../ui/Button";
import { ProductCardsLayoutData, FlexibleContentProps } from "@/types/acf";
import Link from "next/dist/client/link";

interface ProductCardsProps extends FlexibleContentProps {
  data?: ProductCardsLayoutData;
}

export default function ProductCards({ data }: ProductCardsProps) {
  return (
    <div className="container my-14 text-[#010B24]">
      {data?.title && <h2 className="text-5xl leading-14 mb-2">{data.title}</h2>}
      {data?.subtitle && <p className="text-lg text-[#343C50]">{data.subtitle}</p>}
      {data?.products && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {data.products.map((product, index) => (
            <div key={index} className="max-w-[440px]">
              <Image src={product.image.node.sourceUrl} alt={product.title} width={440} height={440} quality={100} className="w-full h-auto rounded-3xl" />
              <div className="flex flex-col gap-2 lg:px-4 pt-4">
                <h3 className="text-2xl">{product.title}</h3>
                <span className="price-el text-[#343C50] text-sm" dangerouslySetInnerHTML={{ __html: product.price }} />
                <p className="text-lg text-[#343C50]">{product.description}</p>
                {product.cta && 
                  <div className="mt-3"><Link href={product.cta.url} target={product.cta.target}><Button variant="black">{product.cta.title}</Button></Link></div>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}