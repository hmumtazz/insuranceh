import { createClient } from '@/lib/supabase/server';
import RateMap from '@/components/rates/rate-map';
import Link from 'next/link';

export default async function RatesMapPage() {
  const supabase = await createClient();

  // Fetch all public rates with converted geography to coordinates
  const { data: rates } = await supabase.rpc('get_public_rates');

  return (
    <div className="flex h-screen flex-col">
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
                  className="text-sm font-medium text-neutral-900"
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
            <Link
              href="/rates/submit"
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Submit Your Rate
            </Link>
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
