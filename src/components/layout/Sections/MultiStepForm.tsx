'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { FlexibleContentProps, MultiStepFormLayoutData } from '@/types/acf';
import Link from 'next/dist/client/link';

interface MultiStepFormProps extends FlexibleContentProps {
  data?: MultiStepFormLayoutData;
}

interface FormData {
  isUsBased: string;
  processingVolume: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const PROCESSING_VOLUME_OPTIONS = [
  '< $5k',
  '$5k - $25k',
  '$25k - $50k',
  '$50k - $100k',
  '$100k - $200k',
  '$200k +'
];

export default function MultiStepForm({ data }: MultiStepFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [formData, setFormData] = useState<FormData>({
    isUsBased: '',
    processingVolume: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const totalSteps = 4;

  const handleInitialCta = () => {
    setShowForm(true);
    setCurrentStep(1);
  };

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Form complete, submit data
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });
      
      try {
        const response = await fetch('/api/get-started', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            isUsBased: formData.isUsBased,
            processingVolume: formData.processingVolume,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit form');
        }

        setSubmitStatus({ type: 'success', message: result.message });
        setCurrentStep(5); // Show thank you page
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitStatus({ 
          type: 'error', 
          message: error instanceof Error ? error.message : 'An error occurred. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1: return formData.isUsBased !== '';
      case 2: return formData.processingVolume !== '';
      case 3: return formData.firstName !== '' && formData.lastName !== '';
      case 4: return formData.email !== '' && formData.phone !== '';
      default: return true;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Is your business based in the United States?';
      case 2: return 'What is your monthly processing volume?';
      case 3: return 'What should we call you?';
      case 4: return 'How can we reach you?';
      default: return '';
    }
  };

  // Hide other sections when form is active
  useEffect(() => {
    if (showForm && currentStep !== 5) {
      document.body.classList.add('questionnaire-active');
    } else {
      document.body.classList.remove('questionnaire-active');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('questionnaire-active');
    };
  }, [showForm, currentStep]);

  if (!data) return null;

  // Initial state - show title, description and CTA
  if (!showForm) {
    return (
      <div className="container py-20 px-10" data-questionnaire-active={false}>
        <div className="max-w-2xl mx-auto text-center">
          {data.title && (
            <h1 className="font-heading text-4xl md:text-6xl/18 font-bold mb-7">
                {data.title}
            </h1>
          )}
          <div className="text-lg text-gray-600 mb-8 check-list" dangerouslySetInnerHTML={{ __html: data.description }} />
          <div className='flex flex-col justify-center items-center'>
            <Button variant="primary" onClick={handleInitialCta}>
                {data.initialCta || 'Get Started'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Thank you message
  if (currentStep === 5) {
    return (
      <div className="container py-20 px-10" data-questionnaire-active={true}>
        <div className="max-w-2xl mx-auto text-center">
            {submitStatus.type === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-800">{submitStatus.message}</p>
                </div>
              </div>
            )}
            <h1 className="font-heading text-4xl md:text-6xl/18 font-bold mb-7">
                Thank You!
            </h1>
            <p className="text-md text-gray-600 mb-8">
                One of our payment consultants will contact you shortly.
            </p>
            <Link href="/" className='flex justify-center'>
                <Button variant="primary">
                    Go Home
                </Button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20 px-10" data-questionnaire-active={true}>
      <div className="max-w-[426px] mx-auto">
        {/* Progress indicators */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 mx-1 rounded ${
                step <= currentStep ? 'bg-[#016EA8]' : 'bg-black/6'
              }`}
            />
          ))}
        </div>

        {/* Progress text */}
        <p className="text-center text-sm text-gray-500 mb-8">
          Progress ({currentStep}/{totalSteps})
        </p>

        {/* Question title */}
        <h2 className="text-2xl md:text-3xl font-heading text-center mb-8">
          {getStepTitle()}
        </h2>

        {/* Error message */}
        {submitStatus.type === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800">{submitStatus.message}</p>
            </div>
          </div>
        )}

        {/* Question content */}
        <div className="mb-10">
          {currentStep === 1 && (
            <div className="flex gap-4 justify-center">
              <Button
                variant={formData.isUsBased === 'yes' ? 'primary' : 'gray'}
                onClick={() => updateFormData('isUsBased', 'yes')}
              >
                Yes
              </Button>
              <Button
                variant={formData.isUsBased === 'no' ? 'primary' : 'gray'}
                onClick={() => updateFormData('isUsBased', 'no')}
              >
                No
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROCESSING_VOLUME_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={`p-4 border rounded-lg text-left transition-all cursor-pointer ${
                    formData.processingVolume === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateFormData('processingVolume', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 justify-center">
          {currentStep > 1 && (
            <Button variant="rounded" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18.7915 11.005H7.62148L12.5015 6.12501C12.8915 5.73501 12.8915 5.09501 12.5015 4.70501C12.1115 4.31501 11.4815 4.31501 11.0915 4.70501L4.50148 11.295C4.11148 11.685 4.11148 12.315 4.50148 12.705L11.0915 19.295C11.4815 19.685 12.1115 19.685 12.5015 19.295C12.8915 18.905 12.8915 18.275 12.5015 17.885L7.62148 13.005H18.7915C19.3415 13.005 19.7915 12.555 19.7915 12.005C19.7915 11.455 19.3415 11.005 18.7915 11.005Z" fill="#010B24"/>
                </svg>
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!isStepComplete() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : currentStep === totalSteps ? 'Submit' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
