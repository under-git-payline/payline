import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import Image from "next/image";
import Link from "next/link";
import { OurTeamLayoutData, FlexibleContentProps } from "@/types/acf";

interface OurTeamProps extends FlexibleContentProps {
    data?: OurTeamLayoutData
}

export default function TeamSection({ data }: OurTeamProps) {
    const { tag, title, description, cta, image } = data || {};
    return (
        <div className={`container flex flex-col lg:flex-row items-stretch justify-center gap-4 px-2 my-10 ${data?.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <div className="w-full lg:w-2/3">
            {image?.node.sourceUrl && (
                <Image
                    src={image?.node.sourceUrl}
                    alt={image?.node.altText}
                    width={1200}
                    height={600}
                    className="max-w-full h-auto rounded-lg"/>
            )}
            </div>
            <div className="flex flex-col justify-center w-full lg:w-1/3 bg-black/2 p-4 md:p-10 rounded-lg">
                {tag && <Tag>{tag}</Tag>}
                {title && (
                    <h2
                        className="text-[32px] md:text-[36px] pt-2 font-medium [&_strong]:text-[#016EA8] [&_strong]:font-medium"
                        dangerouslySetInnerHTML={{ __html: title }}
                        suppressHydrationWarning={true}
                    />
                )}
                {description && description.trim() && (
                    <div
                        className="pb-4"
                        dangerouslySetInnerHTML={{ __html: description }}
                        suppressHydrationWarning={true}
                    />
                )}
                {cta && (
                    <div>
                        <Button variant="gray">
                            <Link href={cta?.url}>{cta?.title}</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}