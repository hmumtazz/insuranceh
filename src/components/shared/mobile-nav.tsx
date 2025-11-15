'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthButtons from '@/components/landing/auth-buttons';
import UserMenu from '@/components/landing/user-menu';

interface MobileNavProps {
  user: any;
  isAdmin: boolean;
}

export function MobileNav({ user, isAdmin }: MobileNavProps) {
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
        <div className="absolute inset-x-4 top-20 z-50 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur">
          <nav className="flex flex-col gap-3 text-sm font-medium text-neutral-800">
            {user && (
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}
            <Link href="/rates/map" onClick={() => setOpen(false)}>
              Rate Map
            </Link>
            <Link href="/forum" onClick={() => setOpen(false)}>
              Forum
            </Link>
            <Link href="/brokers" onClick={() => setOpen(false)}>
              Brokers
            </Link>
            {isAdmin && (
              <Link href="/admin/verifications" onClick={() => setOpen(false)}>
                Admin
              </Link>
            )}
            <a href="#resources" onClick={() => setOpen(false)}>
              Resources
            </a>
          </nav>

          <div className="mt-4 border-t border-neutral-200 pt-4">
            {user ? (
              <UserMenu displayName={user.email ?? 'User'} username={undefined} />
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      )}
    </>
  );
}