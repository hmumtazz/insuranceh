'use client';

import { motion } from 'framer-motion';
import { Section, Pill, H2, Subcopy, Card } from '../ui/primitives';

export function LandingPageCard5({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <Section id="neighborhood-digest" className="py-16">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid items-start gap-8 md:grid-cols-2"
      >
        <div className="space-y-4">
          <Pill className="bg-neutral-100 text-neutral-700">Landing Page Card 5</Pill>
          <H2>Landing Page Card 5</H2>
        </div>
        <div className="space-y-3 md:pl-12">
          <Subcopy>
            Landing Page Card 5
          </Subcopy>
        </div>
      </motion.div>

      <Card className="mt-8 p-5">
        <div className="text-center">
          <p className="text-lg text-neutral-700">Landing Page Card 5</p>
        </div>
      </Card>
    </Section>
  );
}
