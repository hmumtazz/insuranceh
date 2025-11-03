'use client';

import { motion } from 'framer-motion';
import { Section, Card } from '../ui/primitives';

interface HowItWorksProps {
  prefersReducedMotion: boolean;
}

const steps = [
  {
    number: '1',
    title: 'Upload Your Rate',
    description: 'Share your home insurance rate anonymously. Your address stays private.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Compare with Neighbors',
    description: 'See what homeowners in your neighborhood are paying for similar coverage.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Connect with Brokers',
    description: 'Work with verified local brokers who compete for your business—on your terms.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export function HowItWorks({ prefersReducedMotion }: HowItWorksProps) {
  return (
    <Section id="how-it-works" className="py-16 sm:py-20">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          How it Works
        </h2>
        <p className="mt-4 text-lg text-neutral-600 sm:text-xl">
          Three Simple Steps to Take Control of Your Insurance Costs
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.1, ease: 'easeOut' }}
          >
            <Card className="h-full p-8 text-center transition-all hover:shadow-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white">
                {step.icon}
              </div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Step {step.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-neutral-900">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

