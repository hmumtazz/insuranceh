import { createClient } from '@/lib/supabase/server';
import RateMap from '@/components/rates/rate-map';
import Link from 'next/link';
import { MobileNav } from '@/components/shared/mobile-nav';

export default async function RatesMapPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { role?: string } | null = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  // Fetch all public rates with converted geography to coordinates
  const { data: rates } = await supabase.rpc('get_public_rates');

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <nav className="relative z-50 border-b border-white/40 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="flex h-16 w-full items-center px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex flex-1 items-center justify-start">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="RateNextDoor Logo"
                className="h-7 w-auto md:h-8 lg:h-9 object-contain"
              />
            </Link>
          </div>

          {/* Center: Nav links (desktop) */}
          <div className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-neutral-700 md:flex">
            <Link className="transition hover:text-neutral-900" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-neutral-900 transition hover:text-neutral-900" href="/rates/map">
              Rate Map
            </Link>
            <Link className="transition hover:text-neutral-900" href="/forum">
              Forum
            </Link>
          </div>

          {/* Right: Submit button (desktop) + Mobile menu */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden md:block">
              <Link
                href="/rates/submit"
                className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-neutral-900/20 transition hover:bg-black"
              >
                Submit Your Rate
              </Link>
            </div>
            <div className="md:hidden">
              <MobileNav user={user} isAdmin={profile?.role === 'admin'} showAuth={false} />
            </div>
          </div>
        </div>
      </nav>

      {/* Map Container */}
      <div className="flex-1">
        <RateMap initialRates={rates || []} />
      </div>
    </div>
  );
}
