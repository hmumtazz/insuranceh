'use client';

import { motion } from 'framer-motion';
import { Section, Card, CaseCard } from '../ui/primitives';

export function LandingPageCard6({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <Section id="member-spotlight" className="py-16">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid gap-6 md:grid-cols-2"
      >
        <Card className="p-6">
          <p className="text-xl font-semibold leading-relaxed text-neutral-900">
            Landing Page Card 6
          </p>
        </Card>
        <div className="grid gap-4 md:grid-cols-3">
          <CaseCard title="Landing Page Card 6" subtitle="Landing Page Card 6" />
          <CaseCard title="Landing Page Card 6" subtitle="Landing Page Card 6" />
          <CaseCard title="Landing Page Card 6" subtitle="Landing Page Card 6" />
        </div>
      </motion.div>
    </Section>
  );
}
