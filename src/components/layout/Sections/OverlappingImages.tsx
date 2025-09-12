import Image from "next/image";
import { FlexibleContentProps, OverlappingImagesLayoutData } from "@/types/acf";
import Visa from "@/components/icons/Visa";
import Mastercard from "@/components/icons/Mastercard";
import Maestro from "@/components/icons/Maestro";
import Amex from "@/components/icons/Amex";
import Paypal from "@/components/icons/Paypal";
import ApplePay from "@/components/icons/ApplePay";
import GooglePay from "@/components/icons/GooglePay";

interface OverlappingImagesProps extends FlexibleContentProps {
  data?: OverlappingImagesLayoutData;
}

export default function OverlappingImages({ data }: OverlappingImagesProps) {
  if (!data) return null;

  return (
    <div className="my-14">
      <div className="container py-20">
        <div className="flex">
          {data.largeImage && (
            <div className="w-3/4">
              <Image
                src={data.largeImage.node.sourceUrl}
                alt={data.largeImage.node.altText || data.largeImage.node.title || 'Payline Image'}
                width={data?.largeImage?.node?.mediaDetails?.width || 0}
                height={data?.largeImage?.node?.mediaDetails?.height || 0}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
            <div className="w-1/4 relative">
                <div className="grid grid-cols-4 gap-2 p-10">
                    <div className="flex items-center justify-center h-[40px] border-2 border-gray-200 rounded-xl p-2 overflow-hidden">
                        <Visa className="max-w-full max-h-full object-contain" /> 
                    </div>
                    <div className="flex items-center justify-center h-[40px] border-2 border-gray-200 rounded-xl p-2 overflow-hidden">
                        <Mastercard className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-center h-[40px] border-2 border-gray-200 rounded-xl p-2 overflow-hidden">
                        <Maestro className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-center h-[40px] border-2 border-gray-200 rounded-xl p-2 overflow-hidden">
                        <Amex className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-center h-[40px] border-2 border-gray-200 rounded-xl p-2 overflow-hidden">
                        <Paypal className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-center h-[40px] border-2 border-gray-200 rounded-xl p-2 overflow-hidden">
                        <ApplePay className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-center h-[40px] border-2 border-gray-200 rounded-xl p-2 overflow-hidden">
                        <GooglePay className="max-w-full max-h-full object-contain" />
                    </div>
                </div>
                {data.smallImage && (
                    <Image
                    src={data.smallImage.node.sourceUrl}
                    alt={data.smallImage.node.altText || data.smallImage.node.title || 'Payline Image'}
                    width={data?.smallImage?.node?.mediaDetails?.width || 0}
                    height={data?.smallImage?.node?.mediaDetails?.height || 0}
                    className="w-[auto] h-auto rounded-3xl absolute right-8 bottom-0 transform scale-[1.2]"
                    />
                )}
            </div>
        </div>
        <div className="mt-16 max-w-[800px]">
            {data.title && <h2 className="text-5xl">{data.title}</h2>}
            {data.description && <p className="mt-2 text-[#343C50]">{data.description}</p>}
        </div>
      </div>
    </div>
  );
}
