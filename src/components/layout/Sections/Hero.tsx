"use client";

import Image from "next/image";
import Button from "../../ui/Button";
import ArrowRight from "../../icons/ArrowRight";
import Calendar from "../../icons/Calendar";
import dynamic from "next/dynamic";
const CalculatorSection = dynamic(() => import("./CalculatorSection"), { ssr: false });
import { HeroLayoutData, FlexibleContentProps } from "@/types/acf";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { getHeroCardKind, isFeatureHero } from "@/lib/hero";

interface HeroProps extends FlexibleContentProps {
  data?: HeroLayoutData;
}

type CardKind = "form" | "iframe" | "calculator" | "image" | null;

export default function Hero({ data }: HeroProps) {
  // Fallback to default values if no data is provided
  const heroData = {
    tag: data?.tag || "",
    title: data?.title || "",
    description: data?.description || "",
    image: {
      sourceUrl: data?.image?.node?.sourceUrl || "",
      altText: data?.image?.node?.altText || data?.title || "Hero Image",
    },
    cta: {
      title: data?.cta?.title || "",
      url: data?.cta?.url || ""
    },
    secondaryCta: {
      title: data?.secondaryCta?.title || "",
      url: data?.secondaryCta?.url || ""
    },
  };

  const hasImage = Boolean(heroData.image.sourceUrl);
  const shouldShowForm = Boolean(data?.addForm && data?.formId);

  const cardKind: CardKind = getHeroCardKind(data) ?? (hasImage ? "image" : null);
  const useFeatureHero = isFeatureHero(data);
  const hideCtaOnDesktop = cardKind === "form" || cardKind === "iframe";

  const hasCta = Boolean(heroData.cta.url && heroData.cta.title);
  const hasSecondaryCta = Boolean(heroData.secondaryCta.title && heroData.secondaryCta.url);

  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!shouldShowForm || !formContainerRef.current) return;
    const loadAndCreateForm = () => {
      if (typeof window === 'undefined') return;
      const w = window as any;
      if (w.hbspt && w.hbspt.forms) {
        try {
          w.hbspt.forms.create({
            portalId: '47999322',
            formId: data?.formId || 'd7309e7f-88e7-470c-b997-f277796706d8',
            target: `#hero-hubspot-form`,
          });
        } catch (e) {
          console.error('HubSpot form create error', e);
        }
      }
    };

    // If the script is already loaded
    if (typeof (window as any).hbspt !== 'undefined') {
      loadAndCreateForm();
      return;
    }

    // Otherwise, wait for the script to load via event
    const onScriptLoad = () => loadAndCreateForm();
    document.addEventListener('hubspotFormsLoaded', onScriptLoad);
    return () => document.removeEventListener('hubspotFormsLoaded', onScriptLoad);
  }, [shouldShowForm, data?.formId]);

  if (useFeatureHero) {
    return (
      <section className="homepage-hero-clouds relative overflow-hidden pb-10 pt-[114px] lg:pb-12 lg:pt-[120px]">
        <div className="container relative z-10 flex flex-col items-center gap-6 px-4! md:gap-10 md:px-5! lg:gap-10 lg:px-10!">
          <div className="flex w-full max-w-[893px] flex-col items-center gap-2 text-center text-[#040405] md:gap-3">
            {heroData.tag && (
              <span className="rounded bg-black/4 px-3 py-1 text-sm leading-6 font-normal">
                {heroData.tag}
              </span>
            )}
            {heroData.title && (
              <h1 className="text-[32px] leading-[42px] font-medium tracking-[-1px] lg:text-[60px] lg:leading-[66px]">
                {heroData.title}
              </h1>
            )}
            {heroData.description && (
              <p className="max-w-[760px] text-[18px] leading-[26px] text-black/80 lg:text-xl lg:leading-7">
                {heroData.description}
              </p>
            )}
          </div>

          {hasCta && (
            <div className={`flex w-full max-w-[343px] flex-col items-center justify-center gap-3 md:max-w-none md:flex-row ${hideCtaOnDesktop ? 'lg:hidden' : ''}`}>
              <a href={heroData.cta.url} className="block w-full md:w-auto">
                <Button variant="heroPrimary">
                  {heroData.cta.title}
                  <ArrowRight fill="currentColor" />
                </Button>
              </a>
              {hasSecondaryCta && (
                <a href={heroData.secondaryCta.url} className="block w-full md:w-auto">
                  <Button variant="heroSecondary">
                    <Calendar />
                    {heroData.secondaryCta.title}
                  </Button>
                </a>
              )}
            </div>
          )}

          {cardKind === "calculator" ? (
            <CalculatorSection embedded />
          ) : (
            <div className="w-full max-w-[660px] rounded-xl border border-black/6 bg-white p-4 text-black shadow-[0_0_32px_rgba(0,0,0,0.08)] md:p-6">
              {cardKind === "form" ? (
                <div className="w-full" ref={formContainerRef}>
                  <div id="hero-hubspot-form" className="w-full" />
                  <Script
                    src="https://js.hsforms.net/forms/v2.js"
                    strategy="afterInteractive"
                    onLoad={() => {
                      document.dispatchEvent(new Event('hubspotFormsLoaded'));
                    }}
                  />
                </div>
              ) : cardKind === "iframe" ? (
                <iframe
                  ref={iframeRef}
                  src={data?.iframeUrl}
                  className="w-full rounded-lg border-0"
                  style={{ height: '980px' }}
                  title="Embedded Content"
                  allowFullScreen
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
                />
              ) : null}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#002132] bg-[url(/images/hero-bg-darkblue.png)] bg-cover bg-no-repeat bg-top-right text-white mb-10">
      <div
        className={`container flex gap-5 px-4! pt-[114px] pb-10 lg:gap-10 lg:px-10! lg:pt-[120px] lg:pb-20 ${
          hasImage
            ? 'flex-col-reverse lg:flex-row lg:items-center lg:justify-between'
            : 'flex-col items-center text-center'
        }`}
      >
        <div className={`flex flex-col gap-3 ${hasImage ? 'lg:max-w-[580px] lg:flex-1' : 'max-w-3xl items-center text-center'}`}>
          <div className="flex flex-col gap-1.5">
            {heroData.tag && (
              <span className={`rounded-sm bg-white/8 px-2 py-0.5 text-sm/6 font-normal lg:px-3 lg:py-1 ${hasImage ? 'w-fit' : 'mx-auto'}`}>
                {heroData.tag}
              </span>
            )}
            {heroData.title && (
              <h1 className="text-[32px] leading-[42px] font-medium tracking-[-1px] lg:text-[60px] lg:leading-[66px]">
                {heroData.title}
              </h1>
            )}
          </div>
          {heroData.description && (
            <p className="text-[18px] leading-[26px] text-white/80 lg:text-xl lg:leading-7">
              {heroData.description}
            </p>
          )}
          {hasCta && (
            <div className={`flex flex-wrap items-center gap-2 pt-2 ${hasImage ? '' : 'justify-center'}`}>
              <a href={heroData.cta.url} className="block w-full md:w-auto">
                <Button variant="heroPrimary">
                  {heroData.cta.title}
                  <ArrowRight fill="currentColor" />
                </Button>
              </a>
              {hasSecondaryCta && (
                <a href={heroData.secondaryCta.url} className="block w-full md:w-auto">
                  <Button variant="heroSecondaryDark">
                    <Calendar />
                    {heroData.secondaryCta.title}
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
        {hasImage && (
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-[20px] lg:flex-1">
            <Image
              src={heroData.image.sourceUrl}
              alt={heroData.image.altText}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
