import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import RateSubmissionForm from '@/components/rates/rate-submission-form';
import Link from 'next/link';

export default async function SubmitRatePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin?redirect=/rates/submit');
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e9e9e9' }}>
      {/* Header */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
                  <span className="text-lg font-bold text-white">R</span>
                </div>
                <h1 className="text-xl font-bold text-neutral-900">
                  RateNextDoor
                </h1>
              </Link>
              <div className="hidden items-center gap-6 md:flex">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/rates/map"
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Rate Map
                </Link>
                <Link
                  href="/forum"
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Forum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Submit Your Insurance Rate
          </h1>
          <p className="mt-2 text-neutral-600">
            Help others by sharing your home insurance rate. Your exact address
            will be kept private and only an approximate location will be shown
            on the map.
          </p>
        </div>

        <RateSubmissionForm userId={user.id} />
      </div>
    </div>
  );
}
