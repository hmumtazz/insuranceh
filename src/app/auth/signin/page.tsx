'use client';

import { signInWithEmail } from '@/app/actions/auth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Divider from '@/components/ui/divider';
import SocialAuthButtons from '@/components/auth/social-auth-buttons';
import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await signInWithEmail(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo or Brand */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">Insurance Hackr</h2>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl bg-neutral-800/50 p-10 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Sign in to access your account
            </p>
          </div>

          <SocialAuthButtons />

          <Divider text="Or sign in with Email" />

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
                autoComplete="email"
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
                placeholder="Your password"
                required
                autoComplete="current-password"
                className="bg-neutral-900/50 text-white placeholder:text-neutral-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-neutral-400">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-neutral-600 bg-neutral-900/50 text-violet-600 focus:ring-violet-500"
                />
                Remember me for a week
              </label>
              <Link
                href="/auth/reset-password"
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Forgot password?
              </Link>
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
              {loading ? 'Signing in...' : 'Continue with Email'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Sign up
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
