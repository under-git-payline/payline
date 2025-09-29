"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { FlexibleContentProps, StatementUploadLayoutData } from "@/types/acf";

interface StatementUploadProps extends FlexibleContentProps {
  data?: StatementUploadLayoutData;
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

interface UploadStatus {
  state: UploadState;
  message?: string;
}

export default function StatementUpload({ data }: StatementUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ state: 'idle' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!data) {
    return null;
  }

  const handleFileUpload = async (file: File) => {
    setUploadStatus({ state: 'uploading', message: 'Uploading your statement...' });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('customerEmail', '');
      formData.append('customerName', 'Website User');

      const response = await fetch('/api/upload-statement', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadStatus({ 
        state: 'success', 
        message: 'Statement uploaded successfully! Our team will review it shortly.'
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({ 
        state: 'error', 
        message: error instanceof Error ? error.message : 'Upload failed. Please try again.'
      });
    }
  };

  const handleUploadClick = () => {
    if (uploadStatus.state === 'uploading') return;
    
    if (uploadStatus.state === 'success' || uploadStatus.state === 'error') {
      setUploadStatus({ state: 'idle' });
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
    e.target.value = ''; // Reset input
  };

  try {
    const handlePrimaryCta = (url?: string, target?: string) => {
      if (!url || typeof window === "undefined") {
        return;
      }

      if (target === "_blank") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.open(url, target || "_self");
      }
    };

  return (
    <section className="container py-16 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.csv,.xls,.xlsx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {(data.tag || data.title || data.subtitle) && (
          <header className="mb-10 flex flex-col gap-4 text-center">
            {data.tag && (
              <span className="mx-auto w-fit rounded-sm bg-black/10 px-3 py-1 text-sm font-light text-[#1A2339]">
                {data.tag}
              </span>
            )}
            {data.title && (
              <h2 className="text-3xl font-semibold text-[#0f172a] md:text-5xl">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-lg text-[#475467]">
                {data.subtitle}
              </p>
            )}
          </header>
        )}

        {/* Upload Status Messages */}
        {uploadStatus.state !== 'idle' && (
          <div className="mb-8 max-w-2xl mx-auto">
            {uploadStatus.state === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-800">{uploadStatus.message}</p>
                </div>
              </div>
            )}

            {uploadStatus.state === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800">{uploadStatus.message}</p>
                </div>
              </div>
            )}

            {uploadStatus.state === 'uploading' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-blue-800">{uploadStatus.message}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {data.card && data.card.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {data.card.map((card, index) => {
              const iconSrc = card.icon?.node?.sourceUrl;
              const iconAlt = card.icon?.node?.altText || card.icon?.node?.title || card.title || "";

              const getButtonText = () => {
                if (uploadStatus.state === 'uploading') return "Uploading...";
                if (uploadStatus.state === 'success') return "Upload Another";
                if (uploadStatus.state === 'error') return "Try Again";
                return "Upload Statement";
              };

              return (
                <div
                  key={card.fieldGroupName || `${card.__typename}-${index}`}
                  className={`flex h-full flex-col justify-between gap-6 rounded-3xl p-10 ${
                    index % 2 === 1 ? "bg-[#FBDEC9]" : "bg-[#D2E6EA]"
                  }`}
                >
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {iconSrc && (
                      <div className="relative h-20 w-20 bg-white rounded-full p-4 flex items-center justify-center">
                        <Image src={iconSrc} alt={iconAlt} width={36} height={36}/>
                      </div>
                    )}
                    <div className="text-center">
                      {card.title && (
                        <h3 className="text-2xl font-semibold text-[#0f172a]">
                          {card.title}
                        </h3>
                      )}
                      {card.subtitle && (
                        <p className="text-base text-[#475467]">
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {card.ctaUpload ? (
                    <Button 
                      variant="darkTransparent" 
                      onClick={handleUploadClick}
                      disabled={uploadStatus.state === 'uploading'}
                    >
                      {getButtonText()}
                    </Button>
                  ) : card.cta ? (
                    <Button variant="darkTransparent" onClick={() => handlePrimaryCta(card.cta?.url, card.cta?.target)}>
                      {card.cta.title}
                    </Button>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
  } catch (error) {
    console.error('Error rendering StatementUpload component:', error);
    return null;
  }
}
