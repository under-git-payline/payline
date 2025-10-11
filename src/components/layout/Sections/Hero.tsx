"use client";

import Image from "next/image";
import Button from "../../ui/Button";
import dynamic from "next/dynamic";
const CalculatorSection = dynamic(() => import("./CalculatorSection"), { ssr: false });
import { HeroLayoutData, FlexibleContentProps } from "@/types/acf";
import { useEffect, useRef } from "react";
import Script from "next/script";

interface HeroProps extends FlexibleContentProps {
  data?: HeroLayoutData;
}

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
  };

  const hasImage = Boolean(heroData.image.sourceUrl);
  const shouldShowForm = Boolean(data?.addForm && data?.formId);
  const shouldShowIframe = Boolean(data?.addIframe && data?.iframeUrl);
  const hasRightSide = hasImage || shouldShowForm || shouldShowIframe;
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!shouldShowForm || !formContainerRef.current) return;
    const loadAndCreateForm = () => {
      if (typeof window === 'undefined') return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w: any = window as any;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (window as any).hbspt !== 'undefined') {
      loadAndCreateForm();
      return;
    }

    // Otherwise, wait for the script to load via event
    const onScriptLoad = () => loadAndCreateForm();
    document.addEventListener('hubspotFormsLoaded', onScriptLoad);
    return () => document.removeEventListener('hubspotFormsLoaded', onScriptLoad);
  }, [shouldShowForm, data?.formId]);

  return (
    <div className={`relative container ${hasRightSide ? `flex ${hasImage ? 'flex-col-reverse' : 'flex-col'} lg:flex-row items-center justify-between` : 'flex flex-col items-center justify-center text-center'} gap-10 pt-10 px-10 lg:py-10 bg-brand-gradient text-white rounded-4xl ${data?.addCalculator ? 'mb-50' : 'mb-10'}`}>
      <div className={`flex flex-col gap-10 ${hasRightSide ? 'lg:max-w-1/2' : 'max-w-3xl w-full items-center text-center'} ${hasImage ? 'pb-10' : ''} lg:p-10`}>
        <div className="flex flex-col gap-3">
          {heroData.tag && (
            <span className={`text-sm/6 font-light py-1 px-3 bg-black/10 rounded-sm ${hasRightSide ? 'w-fit' : 'mx-auto'}`}>
              {heroData.tag}
            </span>
          )}
          {heroData.title && (
            <h1 className={`text-white font-heading text-4xl md:text-6xl/18 font-bold tracking-[-0.5px] ${hasRightSide ? '' : 'text-center'}`}>
              {heroData.title}
            </h1>
          )}
          {heroData.description && (
            <p className={`text-lg ${hasRightSide ? '' : 'text-center'}`}>
              {heroData.description}
            </p>
          )}
        </div>
        {heroData.cta.url && heroData.cta.title && (
          <div className={`flex gap-4 md:items-center flex-col md:flex-row ${hasRightSide ? '' : 'justify-center'}`}>
            <a href={heroData.cta.url}>
              <Button variant="secondary">
                {heroData.cta.title}
              </Button>
            </a>
          </div>
        )}
      </div>
      {shouldShowForm ? (
        <div className="w-full lg:w-auto pb-10 lg:p-0" ref={formContainerRef}>
          <div id="hero-hubspot-form" className="bg-white text-black rounded-2xl p-4 sm:p-6 md:p-8 w-full lg:w-[620px] max-w-[620px]" />
          <Script
            src="https://js.hsforms.net/forms/v2.js"
            strategy="afterInteractive"
            onLoad={() => {
              // Notify our effect the script is ready
              document.dispatchEvent(new Event('hubspotFormsLoaded'));
            }}
          />
        </div>
      ) : shouldShowIframe ? (
        <div className="w-full bg-white rounded-2xl overflow-hidden mb-10 lg:m-0">
          <iframe
            ref={iframeRef}
            src={data?.iframeUrl}
            className="w-full max-w-[620px] rounded-2xl border-0"
            style={{ 
              height: '980px'
            }}
            title="Embedded Content"
            allowFullScreen
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
          />
        </div>
      ) : (
        hasImage && (
          <Image
            src={heroData.image.sourceUrl}
            alt={heroData.image.altText}
            width={620}
            height={465}
            className="rounded-l-lg"
          />
        )
      )}
      {data?.addCalculator && (
        <div className="w-full max-w-[760px] text-black -mb-[200px]">
          <CalculatorSection embedded />
        </div>
      )}
    </div>
  );
}