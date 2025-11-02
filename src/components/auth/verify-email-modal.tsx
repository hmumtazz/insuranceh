'use client';

import { verifyOtp } from '@/app/actions/auth';
import Button from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import OnboardingModal from './onboarding-modal';

interface VerifyEmailModalProps {
  email: string;
  onClose: () => void;
}

export default function VerifyEmailModal({ email, onClose }: VerifyEmailModalProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    inputRefs.current[0]?.focus();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Show onboarding modal after successful verification
  if (showOnboarding) {
    return <OnboardingModal onClose={onClose} />;
  }

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit)) {
      handleSubmit(newCode.join(''));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);

    if (newCode.every((digit) => digit)) {
      handleSubmit(newCode.join(''));
    }
  }

  async function handleSubmit(fullCode: string) {
    setLoading(true);
    setError(null);

    const result = await verifyOtp(email, fullCode);

    if (result?.error) {
      setError(result.error);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setLoading(false);
    } else {
      // Show onboarding modal after successful verification
      setShowOnboarding(true);
    }
  }

  function getEmailProvider(email: string): { name: string; url: string } | null {
    const domain = email.split('@')[1]?.toLowerCase();

    if (domain?.includes('gmail')) {
      return { name: 'Gmail', url: 'https://mail.google.com' };
    } else if (domain?.includes('yahoo')) {
      return { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' };
    } else if (domain?.includes('outlook') || domain?.includes('hotmail') || domain?.includes('live')) {
      return { name: 'Outlook', url: 'https://outlook.live.com' };
    } else if (domain?.includes('icloud') || domain?.includes('me.com') || domain?.includes('mac.com')) {
      return { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' };
    } else if (domain?.includes('proton')) {
      return { name: 'ProtonMail', url: 'https://mail.proton.me' };
    }

    return null;
  }

  const provider = getEmailProvider(email);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="min-h-[700px] overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="p-16">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  className="h-12 w-12 text-neutral-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-neutral-900">
                Verify your email
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                We sent a 6-digit code to{' '}
                <span className="font-semibold text-neutral-900">{email}</span>
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="mb-10">
              <div className="flex justify-center gap-4">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={loading}
                    className="h-20 w-16 rounded-lg border-2 border-neutral-300 text-center text-3xl font-semibold text-neutral-900 transition-all focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                ))}
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {loading && (
                <div className="mt-4 text-center text-sm text-neutral-600">
                  Verifying...
                </div>
              )}
            </div>

            {/* Email Provider Link */}
            {provider && (
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 flex items-center justify-center gap-3 rounded-lg border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Open {provider.name}
              </a>
            )}

            {/* Resend Code */}
            <div className="space-y-4 border-t border-neutral-200 pt-8">
              <p className="text-center text-base text-neutral-600">
                Didn&apos;t receive the code?
              </p>
              <Button
                variant="outline"
                fullWidth
                className="border-neutral-300 py-4 text-base text-neutral-900 hover:bg-neutral-50"
              >
                Resend Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
