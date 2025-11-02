'use client';

import { useState, useEffect } from 'react';
import AuthModal from '@/components/auth/auth-modal';

export default function ForumAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => {
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

  return (
    <>
      {children}
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
    </>
  );
}
