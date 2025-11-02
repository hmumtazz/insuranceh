import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RateSubmissionItem from '@/components/dashboard/rate-submission-item';
import AppHeader from '@/components/shared/app-header';

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
      'username, first_name, last_name, full_name, email, email_verified, phone, birth_month, birth_day, birth_year, is_anonymous, provider, created_at, role'
    )
    .eq('id', user.id)
    .single();

  // Fetch user's rate submissions
  const { data: rateSubmissions } = await supabase
    .from('rate_submissions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch user's forum posts
  const { data: forumPosts } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('user_id', user.id)
    .is('parent_post_id', null)
    .order('created_at', { ascending: false })
    .limit(5);

  const displayName =
    profile?.full_name ||
    `${profile?.first_name} ${profile?.last_name}` ||
    user.email;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e9e9e9' }}>
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-neutral-900">Dashboard</h2>
          <p className="mt-2 text-lg text-neutral-600">
            Welcome back, {displayName}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-neutral-900">
              Account Information
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-sm font-medium text-neutral-600">
                  Username
                </span>
                <span className="text-sm font-semibold text-neutral-900">
                  @{profile?.username || 'Not set'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-sm font-medium text-neutral-600">
                  Full Name
                </span>
                <span className="text-sm font-semibold text-neutral-900">
                  {displayName}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-sm font-medium text-neutral-600">
                  Email
                </span>
                <span className="text-sm font-semibold text-neutral-900">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-sm font-medium text-neutral-600">
                  Phone
                </span>
                <span className="text-sm font-semibold text-neutral-900">
                  {profile?.phone || 'Not set'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-sm font-medium text-neutral-600">
                  Email Verified
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    profile?.email_verified
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {profile?.email_verified ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-600">
                  Member Since
                </span>
                <span className="text-sm font-semibold text-neutral-900">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-neutral-900">
              Quick Actions
            </h3>
            <div className="mt-6 space-y-4">
              <Link
                href="/rates/submit"
                className="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-6 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800"
              >
                Submit a Rate
              </Link>
              <Link
                href="/rates/map"
                className="flex w-full items-center justify-center rounded-lg border-2 border-neutral-300 bg-white px-6 py-4 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
              >
                View Rate Map
              </Link>
              <Link
                href="/forum"
                className="flex w-full items-center justify-center rounded-lg border-2 border-neutral-300 bg-white px-6 py-4 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
              >
                View Community Forum
              </Link>
            </div>
          </div>
        </div>

        {/* User's Rate Submissions */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-neutral-900">
              My Rate Submissions
            </h3>
            {rateSubmissions && rateSubmissions.length > 0 && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {rateSubmissions.length}{' '}
                {rateSubmissions.length === 1 ? 'submission' : 'submissions'}
              </span>
            )}
          </div>

          {!rateSubmissions || rateSubmissions.length === 0 ? (
            <div className="rounded-lg bg-neutral-50 p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                No rate submissions yet
              </h4>
              <p className="mt-2 text-neutral-600">
                Submit your insurance rate to see how it compares with neighbors
              </p>
              <Link
                href="/rates/submit"
                className="mt-4 inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Submit Your First Rate
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {rateSubmissions.map((submission) => (
                <RateSubmissionItem
                  key={submission.id}
                  submission={submission}
                />
              ))}
            </div>
          )}
        </div>

        {/* User's Forum Posts */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-neutral-900">
              My Forum Posts
            </h3>
            {forumPosts && forumPosts.length > 0 && (
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                {forumPosts.length}{' '}
                {forumPosts.length === 1 ? 'post' : 'posts'}
              </span>
            )}
          </div>

          {!forumPosts || forumPosts.length === 0 ? (
            <div className="rounded-lg bg-neutral-50 p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                No forum posts yet
              </h4>
              <p className="mt-2 text-neutral-600">
                Start a discussion and connect with the community
              </p>
              <Link
                href="/forum"
                className="mt-4 inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Visit Forum
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {forumPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-all hover:border-neutral-300 hover:bg-white"
                >
                  <div className="flex-1">
                    <Link
                      href={`/forum/${post.slug}`}
                      className="group flex flex-col gap-1"
                    >
                      <h4 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-700">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span>
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>{post.upvotes || 0} upvotes</span>
                        <span>•</span>
                        <span>{post.reply_count || 0} replies</span>
                      </div>
                    </Link>
                  </div>
                  <Link
                    href={`/forum/${post.slug}`}
                    className="ml-4 rounded-lg border-2 border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
                  >
                    View Post
                  </Link>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link
                  href="/dashboard/posts"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  View all posts & manage
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
