"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ArrowDown from "@/components/icons/ArrowDown";
import Close from "@/components/icons/Close";

export interface StatementQuestionnaireAnswers {
  name: string;
  phone: string;
  email: string;
  provider: string;
}

interface StatementQuestionnaireModalProps {
  open: boolean;
  fileName: string;
  isSubmitting: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (answers: StatementQuestionnaireAnswers) => void;
}

const INITIAL_FORM_STATE: StatementQuestionnaireAnswers = {
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

export default function StatementQuestionnaireModal({
  open,
  fileName,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit
}: StatementQuestionnaireModalProps) {
  const [formValues, setFormValues] = useState<StatementQuestionnaireAnswers>(INITIAL_FORM_STATE);
  const [countryIndex, setCountryIndex] = useState(0);

  // Start from a clean form every time a new file is attached
  useEffect(() => {
    if (open) {
      setFormValues(INITIAL_FORM_STATE);
      setCountryIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't let Escape abandon an upload that is already in flight
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, isSubmitting, onClose]);

  if (!open) return null;

  const handleInputChange =
    (field: keyof StatementQuestionnaireAnswers) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    onSubmit({
      ...formValues,
      phone: `${COUNTRIES[countryIndex].dial} ${formValues.phone}`.trim(),
    });
  };

  const requestClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div onClick={requestClose} className="absolute inset-0 bg-black/40" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Statement upload questionnaire"
        className="absolute left-1/2 top-1/2 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-[20px] bg-white"
      >
        {/* Heading */}
        <div className="flex items-start gap-5 border-b border-black/6 py-2 pl-5 pr-2">
          <div className="flex-1 py-2">
            <p className="text-[20px] leading-[28px] font-medium text-[#040405]">
              Almost there
            </p>
            <p className="mt-0.5 truncate text-sm text-black/60" title={fileName}>
              {fileName}
            </p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            disabled={isSubmitting}
            aria-label="Close questionnaire"
            className="flex size-[52px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/4 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Close fill="#040405" />
          </button>
        </div>

        <div className="p-5">
          {/* Error message */}
          {errorMessage && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-800">{errorMessage}</p>
              </div>
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="statement-name" className="text-base leading-[26px] text-[#040405]">
                Full name <span className="text-[#B9442E]">*</span>
              </label>
              <input
                id="statement-name"
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
              <label htmlFor="statement-phone" className="text-base leading-[26px] text-[#040405]">
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
                  id="statement-phone"
                  type="tel"
                  required
                  value={formValues.phone}
                  onChange={handleInputChange("phone")}
                  className="min-w-0 flex-1 bg-transparent text-base leading-[26px] text-[#040405] placeholder:text-black/20 focus:outline-none"
                  placeholder="555 123 4567"
                />
              </div>
            </div>

            {/* Email address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="statement-email" className="text-base leading-[26px] text-[#040405]">
                Email Address <span className="text-[#B9442E]">*</span>
              </label>
              <input
                id="statement-email"
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
              <label htmlFor="statement-provider" className="text-base leading-[26px] text-[#040405]">
                Current Provider <span className="text-[#B9442E]">*</span>
              </label>
              <input
                id="statement-provider"
                type="text"
                required
                value={formValues.provider}
                onChange={handleInputChange("provider")}
                className={FIELD_CLASS}
                placeholder="Acme Inc."
              />
            </div>

            <div className="mt-1 flex">
              <Button variant="heroBlack" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Send statement"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
