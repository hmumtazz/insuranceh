import AppHeader from '@/components/shared/app-header';
import StartDiscussionButton from '@/components/forum/start-discussion-button';
import { FORUM_CATEGORIES, SORT_OPTIONS } from '@/lib/forum/constants';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ForumAuthWrapper from '@/components/forum/forum-auth-wrapper';

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const category = params.category;
  const sort = params.sort || 'latest';
  const searchTerm = (params.search || '').trim();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from('forum_posts')
    .select(
      `
        *,
        profiles!forum_posts_user_id_fkey(username, is_anonymous)
      `
    )
    .is('parent_post_id', null);

  if (category) {
    query = query.eq('category', category);
  }

  if (sort === 'latest') {
    query = query.order('last_activity_at', { ascending: false });
  } else if (sort === 'popular') {
    query = query.order('upvotes', { ascending: false });
  } else if (sort === 'new') {
    query = query.order('created_at', { ascending: false });
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
  }

  const normalizedSearch = searchTerm.toLowerCase();
  const filteredPosts =
    posts?.filter((post) => {
      if (!normalizedSearch) return true;
      const title = (post.title || '').toLowerCase();
      const content = (post.content || '').toLowerCase();
      return title.includes(normalizedSearch) || content.includes(normalizedSearch);
    }) ?? [];

  const getCategoryInfo = (categoryId: string) =>
    FORUM_CATEGORIES.find((c) => c.id === categoryId);

  const activeCategory = category ? getCategoryInfo(category) : null;
  const totalPosts = filteredPosts.length;
  const buildHref = (overrides: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams();
    if (category) {
      params.set('category', category);
    }
    if (sort && sort !== 'latest') {
      params.set('sort', sort);
    }
    if (searchTerm) {
      params.set('search', searchTerm);
    }

    Object.entries(overrides).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else if (key === 'sort' && value === 'latest') {
        params.delete('sort');
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    return queryString ? `/forum?${queryString}` : '/forum';
  };

  return (
    <ForumAuthWrapper>
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-200/40">
        <AppHeader />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-neutral-200 pb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-[2.75rem]">
                {activeCategory ? activeCategory.name : 'Community Forum'}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-neutral-600">
                {activeCategory
                  ? activeCategory.description
                  : 'Get straightforward answers from people dealing with the same insurance questions you are.'}
              </p>
            </div>
            {user && (
              <StartDiscussionButton
                variant="solid"
                className="self-start sm:self-end"
              />
            )}
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white/90 shadow-sm backdrop-blur">
              <div className="border-b border-neutral-200 px-5 py-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Categories
                </span>
              </div>
              <nav className="flex flex-col gap-1 px-3 py-3">
                <Link
                  href={buildHref({ category: null })}
                  className={`flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm font-semibold transition ${
                    !category
                      ? 'border-neutral-200 bg-neutral-50 text-neutral-900 shadow-sm'
                      : 'text-neutral-600 hover:border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  All Discussions
                </Link>
                {FORUM_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={buildHref({ category: cat.id })}
                    className={`flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm font-medium transition ${
                      category === cat.id
                        ? 'border-neutral-200 bg-neutral-50 text-neutral-900 shadow-sm'
                        : 'text-neutral-600 hover:border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <main className="relative">
            <div className="space-y-6">
              <div className="rounded-xl border border-neutral-200 bg-white/90 p-5 shadow-sm backdrop-blur">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <form className="flex w-full gap-3 lg:max-w-md" method="get">
                    {category && <input type="hidden" name="category" value={category} />}
                    {sort && <input type="hidden" name="sort" value={sort} />}
                    <input
                      type="search"
                      name="search"
                      defaultValue={searchTerm}
                      placeholder="Search discussions"
                      className="flex-1 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm transition focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400/60"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                    >
                      Search
                    </button>
                  </form>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                    <span className="font-medium text-neutral-600">Sort by</span>
                    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1">
                      {SORT_OPTIONS.map((option) => (
                        <Link
                          key={option.value}
                          href={buildHref({
                            sort: option.value,
                          })}
                          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                            sort === option.value
                              ? 'bg-neutral-900 text-white shadow-sm'
                              : 'text-neutral-700 hover:bg-white'
                          }`}
                        >
                          {option.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  <span>
                    <span className="font-semibold text-neutral-900">{totalPosts}</span>{' '}
                    {totalPosts === 1 ? 'thread' : 'threads'}
                  </span>
                  <span>
                    <span className="font-semibold text-neutral-900">
                      {FORUM_CATEGORIES.length}
                    </span>{' '}
                    communities
                  </span>
                </div>
              </div>

              {totalPosts === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-300 bg-white/90 p-12 text-center shadow-sm backdrop-blur">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {searchTerm ? 'No results found' : 'No discussions yet'}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    {searchTerm
                      ? 'Try a different search or browse another category.'
                      : user
                        ? 'Be the first to start a conversation in this community.'
                        : 'Sign in to start a conversation in this community.'}
                  </p>
                  {user && (
                    <StartDiscussionButton
                      label="Make a post"
                      variant="solid"
                      className="mt-4"
                    />
                  )}
                </div>
              ) : (
                <ul className="space-y-4">
                  {filteredPosts.map((post) => {
                    const categoryInfo = getCategoryInfo(post.category);
                    const displayName = post.profiles?.username || 'User';
                    const lastActivity = new Date(
                      post.last_activity_at || post.created_at
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });

                    return (
                      <li key={post.id}>
                        <Link
                          href={`/forum/${post.slug}`}
                          className="group block rounded-xl border border-neutral-200 bg-white/90 px-5 py-4 shadow-sm transition hover:border-neutral-300 hover:bg-white hover:shadow"
                        >
                          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
                            {categoryInfo && (
                              <span className="rounded-full bg-neutral-200/80 px-2.5 py-1 text-neutral-700">
                                {categoryInfo.name}
                              </span>
                            )}
                            <span>
                              by{' '}
                              <span className="font-medium text-neutral-700">{displayName}</span>
                            </span>
                            <span>·</span>
                            <span>{lastActivity}</span>
                          </div>
                          <h3 className="mt-3 text-lg font-semibold text-neutral-900 transition group-hover:text-neutral-700">
                            {post.title}
                          </h3>
                          {post.content && (
                            <p className="mt-2 text-sm leading-relaxed text-neutral-600 line-clamp-2">
                              {post.content}
                            </p>
                          )}
                          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                            <span className="font-semibold text-neutral-600">
                              {post.upvotes || 0} upvotes
                            </span>
                            <span>{post.reply_count || 0} replies</span>
                            <span>{post.view_count || 0} views</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
    </ForumAuthWrapper>
  );
}
