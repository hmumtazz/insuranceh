import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FORUM_CATEGORIES } from '@/lib/forum/constants';
import VoteButtons from '@/components/forum/vote-buttons';
import ReplyForm from '@/components/forum/reply-form';
import PostActions from '@/components/forum/post-actions';
import { incrementViewCount } from '@/app/actions/forum';
import AppHeader from '@/components/shared/app-header';
import AuthGate from '@/components/forum/auth-gate';

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user profile to check if admin
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    isAdmin = profile?.role === 'admin';
  }

  // Fetch the main post
  const { data: post, error } = await supabase
    .from('forum_posts')
    .select(
      `
      *,
      profiles!forum_posts_user_id_fkey(username, is_anonymous)
    `
    )
    .eq('slug', slug)
    .is('parent_post_id', null)
    .single();

  if (error || !post) {
    notFound();
  }

  // Increment view count
  await incrementViewCount(post.id);

  // Fetch replies
  const { data: replies } = await supabase
    .from('forum_posts')
    .select(
      `
      *,
      profiles!forum_posts_user_id_fkey(username, is_anonymous)
    `
    )
    .eq('parent_post_id', post.id)
    .order('created_at', { ascending: true });

  const categoryInfo = FORUM_CATEGORIES.find((c) => c.id === post.category);
  const displayName = post.profiles?.username || 'User';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e9e9e9' }}>
      <AppHeader />

      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Back Button */}
          <Link
        href="/forum"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
      >
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Forum
      </Link>

      {/* Main Post */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
        <div className="flex gap-6">
          {/* Vote Section */}
          <VoteButtons
            postId={post.id}
            initialUpvotes={post.upvotes || 0}
            initialDownvotes={post.downvotes || 0}
            userId={user?.id}
          />

          {/* Post Content */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {categoryInfo && (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {categoryInfo.name}
                  </span>
                )}
                <span className="text-xs text-neutral-500">•</span>
                <span className="text-xs text-neutral-600">
                  Posted by {displayName}
                </span>
                <span className="text-xs text-neutral-500">•</span>
                <span className="text-xs text-neutral-600">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {post.is_edited && (
                  <>
                    <span className="text-xs text-neutral-500">•</span>
                    <span className="text-xs italic text-neutral-500">
                      edited
                    </span>
                  </>
                )}
              </div>

              {user && (user.id === post.user_id || isAdmin) && (
                <PostActions
                  postId={post.id}
                  content={post.content}
                  isOwner={user.id === post.user_id}
                  isAdmin={isAdmin}
                />
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold text-neutral-900">
              {post.title}
            </h1>

            <div className="prose prose-neutral max-w-none">
              <p className="whitespace-pre-wrap text-neutral-700">
                {post.content}
              </p>
            </div>

            {/* Images */}
            {post.image_urls && post.image_urls.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {post.image_urls.map((url: string, index: number) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Post image ${index + 1}`}
                    className="h-auto w-full rounded-lg border border-neutral-200"
                  />
                ))}
              </div>
            )}

            {/* Post Stats */}
            <div className="mt-6 flex items-center gap-4 border-t border-neutral-100 pt-4 text-sm text-neutral-500">
              <div className="flex items-center gap-1">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{post.reply_count || 0} replies</span>
              </div>
              <div className="flex items-center gap-1">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>{post.view_count || 0} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {user ? (
        <ReplyForm postId={post.id} />
      ) : (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
          <p className="mb-4 text-neutral-600">
            Sign in to reply to this post
          </p>
          <Link
            href="/auth/signin"
            className="inline-block rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Replies */}
      {replies && replies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900">
            {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
          </h2>

          <AuthGate isAuthenticated={!!user} showFirst={3}>
            {replies.map((reply) => {
            const replyDisplayName = reply.profiles?.username || 'User';

            return (
              <div
                key={reply.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <div className="flex gap-4">
                  {/* Vote Section */}
                  <VoteButtons
                    postId={reply.id}
                    initialUpvotes={reply.upvotes || 0}
                    initialDownvotes={reply.downvotes || 0}
                    userId={user?.id}
                  />

                  {/* Reply Content */}
                  <div className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-neutral-600">
                        <span className="font-semibold">
                          {replyDisplayName}
                        </span>
                        <span className="text-neutral-500">•</span>
                        <span>
                          {new Date(reply.created_at).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </span>
                        {reply.is_edited && (
                          <>
                            <span className="text-neutral-500">•</span>
                            <span className="italic text-neutral-500">
                              edited
                            </span>
                          </>
                        )}
                      </div>

                      {user && (user.id === reply.user_id || isAdmin) && (
                        <PostActions
                          postId={reply.id}
                          content={reply.content}
                          isOwner={user.id === reply.user_id}
                          isAdmin={isAdmin}
                        />
                      )}
                    </div>

                    <div className="prose prose-neutral prose-sm max-w-none">
                      <p className="whitespace-pre-wrap text-neutral-700">
                        {reply.content}
                      </p>
                    </div>

                    {/* Reply Images */}
                    {reply.image_urls && reply.image_urls.length > 0 && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {reply.image_urls.map((url: string, index: number) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Reply image ${index + 1}`}
                            className="h-auto w-full rounded-lg border border-neutral-200"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </AuthGate>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
