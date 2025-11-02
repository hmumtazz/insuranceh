'use client';

import { motion } from 'framer-motion';
import { Section, H2, Card } from '../ui/primitives';

export function LandingPageCard4({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <Section id="philosophy" className="py-16">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <H2 className="mb-6 text-center">Landing Page Card 4</H2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="rounded-2xl bg-emerald-50/80 p-4">
              <h4 className="mb-1 font-semibold text-emerald-900">Landing Page Card 4</h4>
              <p className="text-sm text-emerald-900/80">Landing Page Card 4</p>
            </div>
          ))}
        </div>

        <Card className="mt-8 p-6">
          <div className="text-center">
            <p className="text-lg text-neutral-700">Landing Page Card 4</p>
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
