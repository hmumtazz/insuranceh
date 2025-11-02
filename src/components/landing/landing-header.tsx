import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import UserMenu from './user-menu';
import AuthButtons from './auth-buttons';

export default async function LandingHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username, full_name, first_name, last_name')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  const displayName =
    profile?.full_name ||
    `${profile?.first_name} ${profile?.last_name}` ||
    profile?.username ||
    user?.email ||
    'User';

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-20">
      <div className="mx-auto flex w-full items-center justify-between gap-8 rounded-full border border-white/40 bg-white/30 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
            R
          </span>
          <span className="text-base font-semibold tracking-tight text-neutral-900">
            RateNextDoor
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
          <Link className="transition hover:text-neutral-900" href="/rates/map">
            Rate Map
          </Link>
          <Link className="transition hover:text-neutral-900" href="/forum">
            Forum
          </Link>
          <Link className="transition hover:text-neutral-900" href="/brokers">
            Brokers
          </Link>
          <a className="transition hover:text-neutral-900" href="#resources">
            Resources
          </a>
        </div>

        {/* Auth controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu displayName={displayName} username={profile?.username} />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </nav>
  );
}
