'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthButtons from '@/components/landing/auth-buttons';
import UserMenu from '@/components/landing/user-menu';

interface MobileNavProps {
  user: any;
  isAdmin: boolean;
  showAuth?: boolean;
}

export function MobileNav({ user, isAdmin, showAuth = true }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex flex-col items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-3 py-2 text-white shadow-sm"
        aria-label="Open navigation"
        >
        {/* Simple hamburger icon */}
        <span className="block h-[2px] w-5 bg-current" />
        <span className="mt-1 block h-[2px] w-5 bg-current" />
        <span className="mt-1 block h-[2px] w-5 bg-current" />
     </button>

      {open && (
        <div className="absolute inset-x-4 top-20 z-50 rounded-3xl border border-white/70 bg-white/95 px-5 py-4 shadow-xl shadow-black/10 backdrop-blur-xl">
          <nav className="flex flex-col gap-2 text-base font-medium text-neutral-900 text-center">
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2 transition hover:bg-neutral-900/5"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/rates/map"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 transition hover:bg-neutral-900/5"
            >
              Rate Map
            </Link>
            <Link
              href="/forum"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 transition hover:bg-neutral-900/5"
            >
              Forum
            </Link>
            <Link
              href="/brokers"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 transition hover:bg-neutral-900/5"
            >
              Brokers
            </Link>
            {isAdmin && (
              <Link
                href="/admin/verifications"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2 transition hover:bg-neutral-900/5"
              >
                Admin
              </Link>
            )}
            <a
              href="#resources"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 transition hover:bg-neutral-900/5"
            >
              Resources
            </a>

            {/* Submit Rate only on Rate Map page */}
            {!showAuth && (
              <Link
                href="/rates/submit"
                onClick={() => setOpen(false)}
                className="rounded-full bg-neutral-900 px-4 py-2 font-semibold text-white shadow-sm shadow-neutral-900/20 transition hover:bg-black"
              >
                Submit Your Rate
              </Link>
            )}

          </nav>

          {showAuth && (
            <div className="mt-4 rounded-2xl bg-neutral-900/3 px-3 py-3">
              {user ? (
                <UserMenu displayName={user.email ?? 'User'} username={undefined} />
              ) : (
                <div className="flex justify-center">
                  <AuthButtons />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}