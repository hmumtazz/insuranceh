'use client';

import { useState, useEffect } from 'react';
import { signUpWithEmail, signInWithEmail } from '@/app/actions/auth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Divider from '@/components/ui/divider';
import SocialAuthButtons from '@/components/auth/social-auth-buttons';
import VerifyEmailModal from '@/components/auth/verify-email-modal';

interface AuthModalProps {
  mode: 'signin' | 'signup' | null;
  onClose: () => void;
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');

  useEffect(() => {
    if (mode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mode]);

  if (!mode && !showVerify) return null;

  // Show verification modal if user just signed up
  if (showVerify) {
    return (
      <VerifyEmailModal
        email={signupEmail}
        onClose={() => {
          setShowVerify(false);
          onClose();
        }}
      />
    );
  }

  if (!mode) return null;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    if (mode === 'signup') {
      if (!acceptedTerms) {
        setError('Please accept the Terms and Conditions to continue');
        setLoading(false);
        return;
      }

      const emailValue = formData.get('email') as string;
      const result = await signUpWithEmail(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Show verification modal instead of redirecting
        setSignupEmail(emailValue);
        setShowVerify(true);
        setLoading(false);
      }
    } else {
      const result = await signInWithEmail(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    }
  }

  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ zIndex: 9998 }}
      ></div>

      {/* Modal */}
      <div className="relative m-auto w-full max-w-6xl px-4 py-8" style={{ zIndex: 9999 }}>
        <div className="relative flex max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Left Side - Welcome */}
          <div className="hidden w-2/5 flex-col items-center justify-center bg-neutral-50 p-12 lg:flex">
            <div className="text-center">
              <h2 className="mb-8 text-2xl font-semibold text-neutral-900">Welcome!</h2>

              {/* Logo and Gradient Circle */}
              <div className="mb-8 flex items-center justify-center gap-4">
                <div className="text-6xl font-bold text-neutral-900">I.</div>
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                  <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <p className="text-sm text-neutral-600">
                {mode === 'signup' ? 'Already a member?' : 'Not a member?'}{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    // Use a small delay to ensure modal closes before opening new one
                    setTimeout(() => {
                      // Trigger the parent component to open the other modal
                      window.dispatchEvent(new CustomEvent('openAuthModal', {
                        detail: { mode: mode === 'signup' ? 'signin' : 'signup' }
                      }));
                    }, 100);
                  }}
                  className="font-medium text-neutral-900 underline hover:no-underline"
                >
                  {mode === 'signup' ? 'Log in now' : 'Register now'}
                </button>
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full overflow-y-auto bg-white p-8 lg:w-3/5 lg:p-12">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900">
                {mode === 'signup' ? 'Register with your e-mail' : 'Log in'}
              </h2>
            </div>

            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {mode === 'signup' ? 'EMAIL (*)' : 'EMAIL OR USERNAME (*)'}
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  required
                  className="border-neutral-300 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                  PASSWORD (*)
                </label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  minLength={6}
                  className="border-neutral-300 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>

              {mode === 'signin' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-neutral-600">
                    <input type="checkbox" className="rounded border-neutral-300" />
                    Keep me logged in
                  </label>
                  <a
                    href="/auth/reset-password"
                    className="text-sm font-medium text-neutral-900 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-3">
                  <label className="flex items-start gap-2 text-sm text-neutral-600">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900"
                    />
                    <span>
                      I have read and accept the{' '}
                      <a href="/terms" className="underline hover:text-neutral-900">
                        Terms and Conditions
                      </a>
                    </span>
                  </label>

                  <p className="text-xs text-neutral-500">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-neutral-700"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-neutral-700"
                    >
                      Terms of Service
                    </a>{' '}
                    apply.
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                className="mt-6 bg-neutral-900 py-4 text-lg font-bold text-white hover:bg-neutral-800"
              >
                {loading
                  ? mode === 'signup'
                    ? 'Creating account...'
                    : 'Logging in...'
                  : mode === 'signup'
                    ? 'Create Account'
                    : 'Log in now'}
              </Button>
            </form>

            <Divider text={`Or ${mode === 'signup' ? 'register' : 'sign in'} with`} className="my-6" />

            <SocialAuthButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
