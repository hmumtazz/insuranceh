'use client';

import { motion } from 'framer-motion';
import { Section, Pill, H2, Subcopy, LinkInline, SliderDots, Card, CircleBadge, TinyShield } from '../ui/primitives';
import { NeighborhoodPanorama } from '../graphics/decorative-graphics';

export function LandingPageCard2({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <Section id="rate-navigator" className="py-16">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid items-start gap-8 md:grid-cols-2"
      >
        <div className="space-y-4">
          <Pill className="bg-amber-100 text-amber-700">Landing Page Card 2</Pill>
          <H2>Landing Page Card 2</H2>
        </div>
        <div className="space-y-3 md:pl-12">
          <Subcopy>
            Landing Page Card 2
          </Subcopy>
          <LinkInline>Landing Page Card 2 →</LinkInline>
        </div>
      </motion.div>

      <div className="mt-6">
        <SliderDots activeIndex={0} />
      </div>

      <Card className="mt-8 p-5">
        <div className="relative">
          <NeighborhoodPanorama />
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="relative h-64 w-64 rounded-full border-2 border-dotted border-neutral-300">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="rounded-xl border border-neutral-300 bg-white p-2 shadow-sm">
                  <div className="grid h-10 w-10 place-items-center text-neutral-800">
                    <svg viewBox="0 0 24 24" className="h-6 w-6">
                      <g fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4">
                <CircleBadge>
                  <span className="text-[11px] font-semibold text-emerald-700">ZIP 80205</span>
                </CircleBadge>
              </div>
              <div className="absolute -bottom-4 -right-4">
                <CircleBadge>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-700/80">
                    <path
                      d="M5 5h14v14H5zM9 9l6 6M15 9l-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </CircleBadge>
              </div>

              <div className="absolute right-1/2 top-1/2 -translate-y-24 translate-x-24">
                <TinyShield text="Verified snapshot" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&ldquo;Landing Page Card 2.&rdquo;</p>
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
