import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SignOutButton from './sign-out-button';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(
      'username, display_name, email, email_verified, phone, date_of_birth, is_anonymous, provider, created_at'
    )
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              Insurance Hackr
            </h1>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {profile?.display_name || user.email}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Account Information
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Username</span>
                <span className="text-sm font-medium text-gray-900">
                  @{profile?.username}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Display Name</span>
                <span className="text-sm font-medium text-gray-900">
                  {profile?.display_name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Phone</span>
                <span className="text-sm font-medium text-gray-900">
                  {profile?.phone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Email Verified
                </span>
                <span
                  className={`text-sm font-medium ${
                    profile?.email_verified
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {profile?.email_verified ? 'Yes' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Privacy</span>
                <span className="text-sm font-medium text-gray-900">
                  {profile?.is_anonymous ? 'Anonymous' : 'Public'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sign-in Method</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {profile?.provider || 'Email'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(profile?.created_at || '').toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-4 space-y-3">
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Submit a Rate
              </button>
              <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Find Brokers
              </button>
              <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                View Community Forum
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            👋 Your dashboard is ready! Rate submission, broker search, and
            forum features coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
