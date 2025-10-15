'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page with signin modal
    router.replace('/?auth=signin');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#e9e9e9' }}>
      <div className="text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-900 mx-auto">
          <span className="text-sm font-bold text-white">RND</span>
        </div>
        <p className="text-neutral-600">Redirecting to sign in...</p>
      </div>
    </div>
  );
}
