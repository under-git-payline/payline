import { FlexibleContentProps, DarkCtaLayoutData } from "@/types/acf";
import Button from "@/components/ui/Button";

interface DarkCtaProps extends FlexibleContentProps {
  data?: DarkCtaLayoutData;
}

export default function DarkCta({ data }: DarkCtaProps) {
  if (!data) return null;

  return (
    <div className="dark-cta-block container relative flex flex-col lg:flex-row items-center justify-center gap-10 py-5 px-10 lg:py-30 text-white rounded-4xl mt-4 mb-10 overflow-hidden bg-[#1A2339]">
      {/* Floating element - bottom left */}
      <div 
        className="absolute"
        style={{
          left: '-151px',
          bottom: '-140.918px',
          width: '454px',
          height: '454px',
          borderRadius: '454px',
          opacity: 0.6,
          background: 'var(--surface-brand-02, #B0E0F9)',
          filter: 'blur(100px)',
          aspectRatio: '1/1'
        }}
      />
      
      {/* Floating element - top right */}
      <div 
        className="absolute"
        style={{
          right: '-160px',
          top: '-257.082px',
          width: '454px',
          height: '454px',
          borderRadius: '454px',
          opacity: 0.6,
          background: 'var(--surface-brand-03, #AB683A)',
          filter: 'blur(100px)',
          aspectRatio: '1/1'
        }}
      />
      
      <div className="flex flex-col justify-center align-center gap-5 lg:max-w-[660px] relative z-10">
        <div className="dark-cta-block__content flex flex-col gap-3 text-center">
          {data.content && (
            <div
              className="text-white"
              dangerouslySetInnerHTML={{ __html: data.content }}
              suppressHydrationWarning={true}
            />
          )}
        </div>
        <div className="flex gap-4 md:items-center justify-center flex-col md:flex-row">
          {data?.ctaBlue?.url && (
            <a href={data.ctaBlue.url}>
              <Button variant="primary">
                {data.ctaBlue.title}
              </Button>
            </a>
          )}
          {data?.ctaGrey?.url && (
            <a href={data.ctaGrey.url}>
              <Button variant="grayLighter">
                {data.ctaGrey.title}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
