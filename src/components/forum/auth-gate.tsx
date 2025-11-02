'use client';

import { useState, useEffect } from 'react';
import AuthModal from '@/components/auth/auth-modal';

interface AuthGateProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  showFirst?: number;
}

export default function AuthGate({
  isAuthenticated,
  children,
  showFirst = 3,
}: AuthGateProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);
  const [showAll, setShowAll] = useState(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      setShowAll(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Listen for custom auth modal events
    const handleOpenAuthModal = (event: CustomEvent) => {
      setAuthMode(event.detail.mode);
    };

    window.addEventListener(
      'openAuthModal',
      handleOpenAuthModal as EventListener
    );

    return () => {
      window.removeEventListener(
        'openAuthModal',
        handleOpenAuthModal as EventListener
      );
    };
  }, []);

  const childrenArray = Array.isArray(children) ? children : [children];
  const visibleChildren = showAll
    ? childrenArray
    : childrenArray.slice(0, showFirst);
  const hiddenCount = childrenArray.length - showFirst;

  return (
    <>
      <div className="space-y-4">
        {visibleChildren}

        {!showAll && hiddenCount > 0 && (
          <div className="relative">
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white/60 to-white" />

            {/* Blurred preview of hidden content */}
            <div className="pointer-events-none select-none blur-sm">
              {childrenArray.slice(showFirst, showFirst + 1)}
            </div>

            {/* Sign-in prompt */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-xl">
                <h3 className="text-xl font-bold text-neutral-900">
                  Sign in to see all replies
                </h3>
                <p className="mt-2 text-neutral-600">
                  {hiddenCount} more {hiddenCount === 1 ? 'reply' : 'replies'}{' '}
                  below
                </p>
                <div className="mt-6 flex gap-3 justify-center">
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="rounded-lg border-2 border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
    </>
  );
}
