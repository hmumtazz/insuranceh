import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AppHeader from '@/components/shared/app-header';
import { FORUM_CATEGORIES } from '@/lib/forum/constants';
import UserPostActions from '@/components/dashboard/user-post-actions';

export default async function UserPostsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // Fetch all user's forum posts (both main posts and replies)
  const { data: posts } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const mainPosts = posts?.filter((p) => !p.parent_post_id) || [];
  const replies = posts?.filter((p) => p.parent_post_id) || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e9e9e9' }}>
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900">
              My Forum Posts
            </h1>
            <p className="mt-2 text-lg text-neutral-600">
              Manage all your posts and replies
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
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
            Back to Dashboard
          </Link>
        </div>

        {/* Main Posts */}
        <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">
              Discussion Posts
            </h2>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
              {mainPosts.length} {mainPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {mainPosts.length === 0 ? (
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
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                No discussion posts yet
              </h3>
              <p className="mt-2 text-neutral-600">
                Start a new discussion in the forum
              </p>
              <Link
                href="/forum"
                className="mt-4 inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Visit Forum
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mainPosts.map((post) => {
                const categoryInfo = FORUM_CATEGORIES.find(
                  (c) => c.id === post.category
                );
                return (
                  <div
                    key={post.id}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 transition-all hover:border-neutral-300 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          {categoryInfo && (
                            <span className="rounded-full bg-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-700">
                              {categoryInfo.name}
                            </span>
                          )}
                          <span className="text-xs text-neutral-500">
                            {new Date(post.created_at).toLocaleDateString(
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
                          {post.is_edited && (
                            <span className="text-xs italic text-neutral-500">
                              (edited)
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/forum/${post.slug}`}
                          className="group mb-2 block"
                        >
                          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="mb-3 text-sm text-neutral-600 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span>{post.upvotes || 0} upvotes</span>
                          <span>•</span>
                          <span>{post.reply_count || 0} replies</span>
                          <span>•</span>
                          <span>{post.view_count || 0} views</span>
                        </div>
                      </div>
                      <UserPostActions
                        postId={post.id}
                        postSlug={post.slug}
                        isMainPost={true}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Replies */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">My Replies</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
            </span>
          </div>

          {replies.length === 0 ? (
            <div className="rounded-lg bg-neutral-50 p-8 text-center">
              <p className="text-neutral-600">No replies yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
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
                            <span>•</span>
                            <span className="italic">(edited)</span>
                          </>
                        )}
                      </div>
                      <p className="mb-3 text-sm text-neutral-700">
                        {reply.content}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span>{reply.upvotes || 0} upvotes</span>
                      </div>
                    </div>
                    <UserPostActions
                      postId={reply.id}
                      postSlug={null}
                      isMainPost={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
