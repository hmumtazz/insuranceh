import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              Insurance Hackr
            </h1>
            <div className="flex items-center gap-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Compare Home Insurance Rates with Your Neighbors
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See what homeowners in your area are paying for insurance. Find
            verified brokers. Make informed decisions.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Compare Rates
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                See what neighbors pay for similar homes
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Find Brokers
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Connect with verified local insurance agents
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Community Forum
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Learn from real homeowner experiences
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
