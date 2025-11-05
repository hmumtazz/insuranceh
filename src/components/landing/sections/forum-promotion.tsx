'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '../ui/primitives';

interface ForumPromotionProps {
  prefersReducedMotion: boolean;
}

export function ForumPromotion({ prefersReducedMotion }: ForumPromotionProps) {
  return (
    <Section id="forum-promotion" className="py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: -24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Connect with Your Community
          </h2>
          <p className="text-lg leading-relaxed text-neutral-700 sm:text-xl">
            Join thousands of homeowners sharing insights, asking questions, and helping each other navigate the world of home insurance. Get real answers from real neighbors who've been where you are.
          </p>
          <p className="text-lg leading-relaxed text-neutral-700">
            Whether you're comparing rates, understanding coverage options, or looking for broker recommendations, our community forum is here to help.
          </p>
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-neutral-900/20 transition-all hover:bg-black hover:shadow-xl"
          >
            Visit the Forum
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100"
        >
          {/* Placeholder for forum image */}
          <img
            src="/forum-promotion-image.jpg"
            alt="Community forum discussion"
            className="h-full w-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="flex h-full items-center justify-center text-neutral-400"><p class="text-center">Forum Image Placeholder<br/><span class="text-sm">Add forum-promotion-image.jpg to /public</span></p></div>';
              }
            }}
          />
        </motion.div>
      </div>
    </Section>
  );
}

