import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import UserMenu from '@/components/landing/user-menu';
import AuthButtons from '@/components/landing/auth-buttons';
import { MobileNav } from '@/components/shared/mobile-nav';

export default async function AppHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username, full_name, first_name, last_name, role')
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
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-20">
    <div className="mx-auto flex w-full items-center justify-between gap-4 sm:gap-8 rounded-full border border-white/40 bg-white/30 px-4 sm:px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-xl h-16">
      
      {/* Left section (Logo, non-stretched) */}
      <div className="flex flex-1 items-center justify-start">
        <Link href="/" className="flex items-center gap-2.5">
          <img 
            src="/logo.png" 
            alt="RateNextDoor Logo" 
            className="h-7 w-auto md:h-8 lg:h-9 object-contain"
          />
        </Link>
      </div>

      {/* Center section (Navigation) */}
      <div className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
        {user && (
          <Link className="transition hover:text-neutral-900" href="/dashboard">
            Dashboard
          </Link>
        )}
        <Link className="transition hover:text-neutral-900" href="/rates/map">
          Rate Map
        </Link>
        <Link className="transition hover:text-neutral-900" href="/forum">
          Forum
        </Link>
        <Link className="transition hover:text-neutral-900" href="/brokers">
          Brokers
        </Link>
        {profile?.role === 'admin' && (
          <Link className="transition hover:text-neutral-900" href="/admin/verifications">
            Admin
          </Link>
        )}
        <a className="transition hover:text-neutral-900" href="#resources">
          Resources
        </a>
      </div>

      {/* Right section (Auth + Mobile menu trigger) */}
      <div className="flex flex-1 items-center justify-end gap-3">
        {/* Desktop auth controls */}
        <div className="hidden md:flex">
          {user ? (
            <UserMenu displayName={displayName} username={profile?.username} />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <MobileNav
            user={user}
            isAdmin={profile?.role === 'admin'}
          />
        </div>
      </div>
    </div>
    </nav>


  );
}
