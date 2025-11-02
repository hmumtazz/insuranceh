'use client';

import { motion } from 'framer-motion';
import { Section, Pill, H2, Subcopy, LinkInline, SliderDots, Card, WorkflowRow } from '../ui/primitives';
import { NeighborhoodPanorama } from '../graphics/decorative-graphics';

export function LandingPageCard1({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <Section id="renewal-workflows" className="py-16">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid items-start gap-8 md:grid-cols-2"
      >
        <div className="space-y-4">
          <Pill className="bg-neutral-100 text-neutral-700">Landing Page Card 1</Pill>
          <H2>Landing Page Card 1</H2>
        </div>
        <div className="space-y-3 md:pl-12">
          <Subcopy>
            Landing Page Card 1
          </Subcopy>
          <LinkInline>Landing Page Card 1 →</LinkInline>
        </div>
      </motion.div>

      <div className="mt-6">
        <SliderDots activeIndex={1} />
      </div>

      <Card className="mt-8 p-5">
        <div className="relative">
          <NeighborhoodPanorama warm />
          <div className="absolute inset-0 grid place-items-center px-6">
            <div className="grid w-full max-w-3xl grid-cols-1 gap-3 md:grid-cols-3">
              <div className="space-y-3">
                {[
                  'When renewal date is 60 days out',
                  'When coverage exceeds neighborhood median',
                  'When premium increases more than 8%',
                  'When umbrella policy needs inspection',
                  'When a new claim hits your record',
                ].map((text) => (
                  <WorkflowRow key={text} text={text} icon="+" />
                ))}
              </div>
              <div className="grid place-items-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-500 text-white shadow-lg">
                  <svg viewBox="0 0 24 24" className="h-7 w-7">
                    <path d="M13 2L3 14h7l-1 8 11-12h-7V2z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  'Send summary to household',
                  'Flag preferred broker with context',
                  'Auto-build comparison grid in RateNextDoor',
                  'Log renewal notes in Notion HQ',
                  'Book a consult with neighborhood expert',
                ].map((text) => (
                  <WorkflowRow key={text} text={text} icon="↗" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&ldquo;Landing Page Card 1.&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 overflow-hidden rounded bg-neutral-200" />
            <div className="grid h-6 w-6 place-items-center rounded bg-neutral-900 text-[10px] text-white">
              RN
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
