'use client';

import { verifyOtp } from '@/app/actions/auth';
import Button from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-8 w-8 text-blue-600"
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
          <h1 className="text-3xl font-bold text-gray-900">
            Verify your email
          </h1>
          <p className="mt-3 text-base text-gray-600">
            We sent a 6-digit code to{' '}
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        <div>
          <div className="flex justify-center gap-3">
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
                className="h-14 w-12 rounded-lg border-2 border-gray-300 text-center text-2xl font-semibold text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
            ))}
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-3">{error}</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Verifying...
            </div>
          )}
        </div>

        {provider && (
          <a
            href={provider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
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

        <div className="space-y-3 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600">
            Didn't receive the code?
          </p>
          <Button variant="outline" fullWidth>
            Resend Code
          </Button>
        </div>
      </div>
    </div>
  );
}
