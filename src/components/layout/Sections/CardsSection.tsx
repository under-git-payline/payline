import ArrowRight from "@/components/icons/ArrowRight";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { CardsLayoutData, FlexibleContentProps } from "@/types/acf";

interface CardsSectionProps extends FlexibleContentProps {
  data?: CardsLayoutData;
}

export default function CardsSection({ data }: CardsSectionProps) {
    // Fallback to default values if no data is provided
    const cardsData = {
        tag: data?.tag || "Customers",
        title: data?.title || "Swipe or tap payments at your business or over the phone or on your mobile phone",
        subtitle: data?.subtitle || "",
        cards: data?.cards || [
            {
                title: "In-person",
                content: "Swipe or tap payments at your counter or while on the move.",
                link: { url: "/in-person-payments", title: "Learn More", target: "_self", __typename: "AcfLink" },
                image: { 
                    node: { 
                        sourceUrl: "/images/in-person-payments.png", 
                        altText: "In-person Payments",
                        uri: "/images/in-person-payments.png",
                        mediaDetails: { width: 538, height: 790 },
                        __typename: "MediaItem"
                    },
                    __typename: "MediaItemEdge"
                },
                style: "primary",
                __typename: "CardItem"
            },
            {
                title: "Online",
                content: "Create a ready-to-run online store or seamlessly integrate payments into your existing website.",
                link: { url: "/online-payments", title: "Learn More", target: "_self", __typename: "AcfLink" },
                image: { 
                    node: { 
                        sourceUrl: "/images/online-payments.png", 
                        altText: "Online Payments",
                        uri: "/images/online-payments.png",
                        mediaDetails: { width: 455, height: 231 },
                        __typename: "MediaItem"
                    },
                    __typename: "MediaItemEdge"
                },
                __typename: "CardItem"
            },
            {
                title: "Recurring",
                content: "Streamline billing, tailor subscription plans, and boost revenue with ease—perfect for managing memberships, payment schedules, or retainers.",
                link: { url: "/recurring-payments", title: "Learn More", target: "_self", __typename: "AcfLink" },
                image: { 
                    node: { 
                        sourceUrl: "/images/recurring-payments.png", 
                        altText: "Recurring Payments",
                        uri: "/images/recurring-payments.png",
                        mediaDetails: { width: 414, height: 215 },
                        __typename: "MediaItem"
                    },
                    __typename: "MediaItemEdge"
                },
                __typename: "CardItem"
            }
        ]
    };

    // Split cards into primary (first) and secondary (rest)
    const primaryCard = cardsData.cards[0];
    const secondaryCards = cardsData.cards.slice(1);
    return (
        <div className="container flex flex-col items-center justify-center gap-12 py-20 px-2 my-10">
            <SectionHeader
                tag={cardsData.tag}
                title={cardsData.title}
                subtitle={cardsData.subtitle}
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-[1126px]">
                {/* Primary Card */}
                {primaryCard && (
                    <div className="flex flex-col justify-between rounded-3xl bg-[linear-gradient(76deg,#B0E0F9_-4.48%,#E6F5FD_99.55%)] w-full md:w-1/2 self-stretch">
                        <Content
                            title={primaryCard.title}
                            subtitle={primaryCard.content}
                            link={primaryCard.link}
                            style={primaryCard.style}
                        />
                        <Image
                            src={primaryCard.image.node.sourceUrl}
                            alt={primaryCard.image.node.altText}
                            height={primaryCard.image.node.mediaDetails?.height || 790}
                            width={primaryCard.image.node.mediaDetails?.width || 538}
                            className="max-h-full max-w-full pr-4"
                        />
                    </div>
                )}
                
                {/* Secondary Cards */}
                <div className="flex flex-col items-center w-full md:w-1/2 gap-4">
                    {secondaryCards.map((card, index) => (
                        <div 
                            key={index}
                            className={`flex flex-col rounded-3xl ${
                                index === 0 
                                    ? "bg-[linear-gradient(225deg,_#FEF4EE_0%,_#FBDEC9_100%)]" 
                                    : "bg-[linear-gradient(225deg,_#F1F7F8_0%,_#D2E6EA_100%)]"
                            }`}
                        >
                            <Content
                                title={card.title}
                                subtitle={card.content}
                                link={card.link}
                            />
                            <Image
                                src={card.image.node.sourceUrl}
                                alt={card.image.node.altText}
                                width={card.image.node.mediaDetails?.width || 455}
                                height={card.image.node.mediaDetails?.height || 231}
                                className="max-h-full max-w-full self-end"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

type ContentProps = {
    title?: string;
    subtitle?: string;
    link?: {
        url: string;
        title: string;
        target?: string;
    };
    style?: string;
};

const Content = ({ title, subtitle, link, style }: ContentProps) => (
    <div className="p-8">
        {title && <h3 className={`font-medium text-primary mb-1 ${style === "primary" ? "text-4xl" : "text-2xl"}`}>{title}</h3>}
        {subtitle && <p className="text-lg text-[#343C50] pb-4">{subtitle}</p>}
        {link && <Link href={link.url} className="text-[#0E172F] underline flex items-center gap-1">{link.title || "Learn More"} <ArrowRight /></Link>}
    </div>
);