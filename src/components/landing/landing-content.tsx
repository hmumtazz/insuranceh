'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import AuthModal from '@/components/auth/auth-modal';
import { Hero } from './sections/hero';
import { MissionStatement } from './sections/mission-statement';
import { LandingPageCard1 } from './sections/landing-page-card-1';
import { LandingPageCard2 } from './sections/landing-page-card-2';
import { HowItWorks } from './sections/how-it-works';
import { RateMapVideo } from './sections/rate-map-video';
import { LandingPageCard4 } from './sections/landing-page-card-4';
import { LandingPageCard5 } from './sections/landing-page-card-5';
import { LandingPageCard6 } from './sections/landing-page-card-6';
import { LandingPageCard7 } from './sections/landing-page-card-7';
import { Testimonials } from './sections/testimonials';

import { Footer } from './sections/footer';

declare global {
  interface WindowEventMap {
    openAuthModal: CustomEvent<{ mode: 'signin' | 'signup' }>;
  }
}

export default function LandingContent() {
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authParam = params.get('auth');
    if (authParam === 'signin' || authParam === 'signup') {
      setAuthModal(authParam);
      window.history.replaceState({}, '', '/');
    }

    const handleOpenAuthModal = (event: WindowEventMap['openAuthModal']) => {
      setAuthModal(event.detail.mode);
    };

    window.addEventListener('openAuthModal', handleOpenAuthModal);
    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-white text-[#1a1a1a] selection:bg-amber-200/60">
        <Hero
          prefersReducedMotion={prefersReducedMotion}
          onSignupClick={() => setAuthModal('signup')}
        />
        <MissionStatement prefersReducedMotion={prefersReducedMotion} />
        <LandingPageCard2 prefersReducedMotion={prefersReducedMotion} />
        <HowItWorks prefersReducedMotion={prefersReducedMotion} />
        <RateMapVideo prefersReducedMotion={prefersReducedMotion} />
        <LandingPageCard1 prefersReducedMotion={prefersReducedMotion} />
        <LandingPageCard5 prefersReducedMotion={prefersReducedMotion} />
        <LandingPageCard4 prefersReducedMotion={prefersReducedMotion} />
        <Testimonials prefersReducedMotion={prefersReducedMotion} />
        <LandingPageCard6 prefersReducedMotion={prefersReducedMotion} />
        <LandingPageCard7 onSignupClick={() => setAuthModal('signup')} />
        <Footer />
      </main>

      <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />
    </>
  );
}
