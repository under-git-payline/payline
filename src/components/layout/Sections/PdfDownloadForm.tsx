"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import ArrowDown from "@/components/icons/ArrowDown";
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

const COUNTRIES = [
  { name: "United States", dial: "+1" },
  { name: "Canada", dial: "+1" },
  { name: "United Kingdom", dial: "+44" },
  { name: "Australia", dial: "+61" },
  { name: "Ireland", dial: "+353" },
  { name: "New Zealand", dial: "+64" },
];

const FIELD_CLASS =
  "h-[52px] w-full rounded border border-black/20 bg-black/2 px-4 text-base leading-[26px] text-[#040405] placeholder:text-black/20 focus:border-black/40 focus:outline-none";

export default function PdfDownloadForm({ data }: PdfDownloadFormProps) {
  const [formValues, setFormValues] = useState<FormFields>(INITIAL_FORM_STATE);
  const [countryIndex, setCountryIndex] = useState(0);
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
          phone: formValues.phone ? `${COUNTRIES[countryIndex].dial} ${formValues.phone}` : "",
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
    <section className="pdf-download-form bg-[#F9F9FA] py-20">
      <div className="container mx-auto px-4! lg:px-10!">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          <div className="lg:w-1/2 lg:px-10">
            {data.content ? (
              <div
                className="text-[17px] leading-[26px] text-[#040405] [&_strong]:text-[#1A2339] [&_a]:text-[#016EA8] [&_p]:mb-4 lg:text-xl lg:leading-7"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            ) : null}
          </div>
          <div className="lg:w-1/2">
            <div>
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
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pdf-download-name" className="text-base leading-[26px] text-[#040405]">
                    Full name <span className="text-[#B9442E]">*</span>
                  </label>
                  <input
                    id="pdf-download-name"
                    type="text"
                    required
                    value={formValues.name}
                    onChange={handleInputChange("name")}
                    className={FIELD_CLASS}
                    placeholder="John Doe"
                  />
                </div>

                {/* Phone number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pdf-download-phone" className="text-base leading-[26px] text-[#040405]">
                    Phone Number <span className="text-[#B9442E]">*</span>
                  </label>
                  <div className={`${FIELD_CLASS} flex items-center gap-2 px-4`}>
                    <div className="relative flex shrink-0 items-center">
                      <select
                        aria-label="Country dialling code"
                        value={countryIndex}
                        onChange={(event) => setCountryIndex(Number(event.target.value))}
                        className="w-[104px] appearance-none truncate bg-transparent pr-5 text-base leading-[26px] text-black/60 focus:outline-none sm:w-[184px]"
                      >
                        {COUNTRIES.map((country, index) => (
                          <option key={country.name} value={index}>
                            {`${country.name} (${country.dial})`}
                          </option>
                        ))}
                      </select>
                      <ArrowDown className="pointer-events-none absolute right-0 h-4 w-4" fill="rgba(0,0,0,0.6)" />
                    </div>
                    <input
                      id="pdf-download-phone"
                      type="tel"
                      value={formValues.phone}
                      onChange={handleInputChange("phone")}
                      className="min-w-0 flex-1 bg-transparent text-base leading-[26px] text-[#040405] placeholder:text-black/20 focus:outline-none"
                      placeholder="555 123 4567"
                    />
                  </div>
                </div>

                {/* Email address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pdf-download-email" className="text-base leading-[26px] text-[#040405]">
                    Email Address <span className="text-[#B9442E]">*</span>
                  </label>
                  <input
                    id="pdf-download-email"
                    type="email"
                    required
                    value={formValues.email}
                    onChange={handleInputChange("email")}
                    className={FIELD_CLASS}
                    placeholder="john@mail.com"
                  />
                </div>

                {/* Current provider */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pdf-download-provider" className="text-base leading-[26px] text-[#040405]">
                    Current Provider <span className="text-[#B9442E]">*</span>
                  </label>
                  <input
                    id="pdf-download-provider"
                    type="text"
                    required
                    value={formValues.provider}
                    onChange={handleInputChange("provider")}
                    className={FIELD_CLASS}
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="mt-1 flex">
                  <Button variant="heroBlack" disabled={isSubmitting || !downloadUrl}>
                    {isSubmitting ? "Processing..." : downloadUrl ? "Access switching guide" : "File unavailable"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
