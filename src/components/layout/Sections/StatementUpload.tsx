"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import StatementQuestionnaireModal, {
  StatementQuestionnaireAnswers,
} from "@/components/ui/StatementQuestionnaireModal";
import { validateStatementFile } from "@/lib/statementUpload";
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
  // Held in memory only - nothing is sent until the questionnaire is submitted
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!data) {
    return null;
  }

  const handleFileUpload = async (file: File, answers: StatementQuestionnaireAnswers) => {
    setUploadStatus({ state: 'uploading', message: 'Uploading your statement...' });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', answers.name);
      formData.append('phone', answers.phone);
      formData.append('email', answers.email);
      formData.append('provider', answers.provider);

      const response = await fetch('/api/upload-statement', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setPendingFile(null);
      setUploadStatus({
        state: 'success',
        message: 'Statement uploaded successfully! Our team will review it shortly.'
      });
    } catch (error) {
      console.error('Upload error:', error);
      // Keep pendingFile so the questionnaire stays open and retry needs no re-pick
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
    // Grab the File before resetting: input.files is a live FileList, so
    // clearing value empties it and any reference to it reports length 0.
    const file = e.target.files?.[0] ?? null;
    e.target.value = ''; // Reset input so re-picking the same file still fires onChange

    if (!file) {
      return;
    }

    // Fail fast so nobody answers four questions only to be told the file is invalid
    const validationError = validateStatementFile(file);
    if (validationError) {
      setUploadStatus({ state: 'error', message: validationError });
      return;
    }

    setUploadStatus({ state: 'idle' });
    setPendingFile(file);
  };

  const handleQuestionnaireClose = () => {
    setPendingFile(null);
    setUploadStatus({ state: 'idle' });
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
    <section className="bg-[#F9F9FA]">
      <div className="container py-10 px-4! lg:px-10!">
       <div className="mx-auto max-w-[1126px]">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.csv,.xls,.xlsx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {(data.tag || data.title || data.subtitle) && (
          <header className="mx-auto mb-10 flex max-w-[660px] flex-col items-center gap-1 text-center">
            {data.tag && (
              <span className="rounded bg-black/4 px-3 py-1 text-sm leading-6 font-normal text-[#040405]">
                {data.tag}
              </span>
            )}
            {data.title && (
              <h2 className="text-[32px] leading-[38px] font-medium tracking-[-1px] text-[#040405] lg:text-[44px] lg:leading-[48px]">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="mt-1 text-[17px] leading-[1.45] text-black/80 md:text-xl md:leading-7">
                {data.subtitle}
              </p>
            )}
          </header>
        )}

        {/* Questionnaire - gates the upload until every question is answered */}
        <StatementQuestionnaireModal
          open={pendingFile !== null}
          fileName={pendingFile?.name ?? ''}
          isSubmitting={uploadStatus.state === 'uploading'}
          errorMessage={uploadStatus.state === 'error' ? uploadStatus.message : undefined}
          onClose={handleQuestionnaireClose}
          onSubmit={(answers) => {
            if (pendingFile) handleFileUpload(pendingFile, answers);
          }}
        />

        {/* Upload Status Messages - the modal shows its own errors while open */}
        {uploadStatus.state !== 'idle' && pendingFile === null && (
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
              const imageSrc = card.icon?.node?.sourceUrl;

              const getButtonText = () => {
                if (uploadStatus.state === 'uploading') return "Uploading...";
                if (uploadStatus.state === 'success') return "Upload Another";
                if (uploadStatus.state === 'error') return "Try Again";
                return "Upload Statement";
              };

              return (
                <div
                  key={`${card.fieldGroupName || card.__typename}-${index}`}
                  className="flex h-full flex-col gap-5 pb-5"
                >
                  <div className="relative aspect-3/2 w-full overflow-hidden rounded-[20px] bg-[#E8E8E8]">
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={card.icon?.node?.altText || card.title || ""}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 551px, 100vw"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {card.title && (
                      <h3 className="text-[26px] leading-[30px] font-medium tracking-[-1px] text-[#040405] lg:text-[32px] lg:leading-[36px]">
                        {card.title}
                      </h3>
                    )}
                    {card.subtitle && (
                      <p className="text-[17px] leading-[1.45] text-black/80 md:text-xl md:leading-7">
                        {card.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex">
                    {card.ctaUpload ? (
                      <Button
                        variant="heroSecondary"
                        onClick={handleUploadClick}
                        disabled={uploadStatus.state === 'uploading'}
                      >
                        {getButtonText()}
                      </Button>
                    ) : card.cta ? (
                      <Button variant="heroSecondary" onClick={() => handlePrimaryCta(card.cta?.url, card.cta?.target)}>
                        {card.cta.title}
                      </Button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
       </div>
      </div>
    </section>
  );
  } catch (error) {
    console.error('Error rendering StatementUpload component:', error);
    return null;
  }
}
