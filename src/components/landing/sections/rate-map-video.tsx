'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section, Pill, H2, Subcopy, Card } from '../ui/primitives';

interface RateMapVideoProps {
  prefersReducedMotion: boolean;
}

export function RateMapVideo({ prefersReducedMotion }: RateMapVideoProps) {
  return (
    <Section id="rate-map-demo" className="py-16">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid items-start gap-8 md:grid-cols-2"
      >
        <div className="space-y-4">
          <Pill className="bg-amber-100 text-amber-700">Interactive Map</Pill>
          <H2>See Insurance Rates Right Where You Live</H2>
        </div>
        <div className="space-y-3 md:pl-12">
          <Subcopy>
            Explore real insurance rates from homeowners in your neighborhood. Our interactive map lets you filter by location, coverage type, and property details to find the most relevant comparisons.
          </Subcopy>
          <Link href="/rates/map" className="underline underline-offset-4 decoration-neutral-400 transition-colors hover:text-neutral-900">
            Explore the Rate Map →
          </Link>
        </div>
      </motion.div>

      <Card className="mt-8 overflow-hidden p-0">
        <div className="relative aspect-video w-full bg-neutral-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            aria-label="Rate map demonstration video showing interactive insurance rate comparisons"
          >
            <source src="/rate-map-demo.mp4" type="video/mp4" />
            <source src="/rate-map-demo.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          {/* Optional: Overlay gradient for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent pointer-events-none" />
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>&ldquo;Watch how easy it is to compare insurance rates in your neighborhood.&rdquo;</p>
            <Link
              href="/rates/map"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-700"
            >
              Try it yourself
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Card>
    </Section>
  );
}

