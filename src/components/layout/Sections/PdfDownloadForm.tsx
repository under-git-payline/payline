"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { FlexibleContentProps, PdfDownloadFormLayoutData } from "@/types/acf";

interface PdfDownloadFormProps extends FlexibleContentProps {
  data?: PdfDownloadFormLayoutData;
}

type FormFields = {
  name: string;
  email: string;
  phone: string;
  provider: string;
};

const INITIAL_FORM_STATE: FormFields = {
  name: "",
  phone: "",
  email: "",
  provider: "",
};

export default function PdfDownloadForm({ data }: PdfDownloadFormProps) {
  const [formValues, setFormValues] = useState<FormFields>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  if (!data) {
    return null;
  }

  const downloadUrl = data.downloadFile?.node?.mediaItemUrl ?? "";
  const downloadTitle = data.downloadFile?.node?.title ?? "download";

  const handleInputChange = (field: keyof FormFields) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!downloadUrl) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Send form data to WordPress backend
      const response = await fetch('/api/pdf-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          provider: formValues.provider,
          downloadUrl: downloadUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitStatus({ type: 'success', message: result.message });

      // Start download after successful form submission
      if (typeof window !== "undefined") {
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.download = downloadTitle;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }

      setFormValues(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pdf-download-form bg-[#F9F9FA] py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          <div className="lg:w-1/2">
            {data.content ? (
              <div
                className="text-lg text-[#343C50] [&_strong]:text-[#1A2339] [&_a]:text-[#016EA8] [&_p]:mb-4 flex flex-col justify-center h-full"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            ) : null}
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white rounded-3xl p-8 border border-black/6">
              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`mb-4 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {submitStatus.type === 'success' ? (
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <p className={submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              )}

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* First name */}
                <div className="flex flex-col gap-2">
                  <input
                    id="pdf-download-name"
                    type="text"
                    required
                    value={formValues.name}
                    onChange={handleInputChange("name")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="First name *"
                  />
                </div>
                {/* Phone number */}
                <div className="flex flex-col gap-2">
                  <input
                    id="pdf-download-phone"
                    type="text"
                    value={formValues.phone}
                    onChange={handleInputChange("phone")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone number"
                  />
                </div>

                {/* Email address */}
                <div className="flex flex-col gap-2">
                  <input
                    id="pdf-download-email"
                    type="email"
                    required
                    value={formValues.email}
                    onChange={handleInputChange("email")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email address *"
                  />
                </div>

                {/* Current provider */}
                <div className="flex flex-col gap-2">
                  <input
                    id="pdf-download-provider"
                    type="text"
                    required
                    value={formValues.provider}
                    onChange={handleInputChange("provider")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Current provider *"
                  />
                </div>
                <Button disabled={isSubmitting || !downloadUrl}>
                  {isSubmitting ? "Processing..." : downloadUrl ? "Access switching guide" : "File unavailable"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
