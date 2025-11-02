'use client';

import { motion } from 'framer-motion';

export function LandingPageCard3({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-bold text-neutral-900">Landing Page Card 3</h2>
        <p className="mt-4 text-lg text-neutral-700">Landing Page Card 3</p>
      </motion.div>
    </section>
  );
}
