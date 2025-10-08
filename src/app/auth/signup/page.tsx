'use client';

import { signUpWithEmail } from '@/app/actions/auth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Divider from '@/components/ui/divider';
import SocialAuthButtons from '@/components/auth/social-auth-buttons';
import PrivacyBanner from '@/components/auth/privacy-banner';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const emailValue = formData.get('email') as string;

    const result = await signUpWithEmail(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = `/auth/verify?email=${encodeURIComponent(emailValue)}`;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo or Brand */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">Insurance Hackr</h2>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-2xl bg-neutral-800/50 p-10 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Start comparing home insurance rates today
            </p>
          </div>

          <SocialAuthButtons />

          <Divider text="Or continue with Email" />

          <form action={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Work Email
              </label>
              <Input
                name="email"
                type="email"
                placeholder="name@work.com"
                required
                className="bg-neutral-900/50 text-white placeholder:text-neutral-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Password
              </label>
              <Input
                name="password"
                type="password"
                placeholder="At least 6 characters"
                required
                minLength={6}
                className="bg-neutral-900/50 text-white placeholder:text-neutral-500"
              />
              <p className="mt-1 text-xs text-neutral-500">
                Choose a strong password with at least 6 characters
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-3"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-neutral-500">
          © Insurance Hackr, Inc.
        </div>
      </div>
    </div>
  );
}
