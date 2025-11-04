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
  },
  {
    number: '2',
    title: 'Compare with Neighbors',
    description: 'See what homeowners in your neighborhood are paying for similar coverage.',
  },
  {
    number: '3',
    title: 'Connect with Brokers',
    description: 'Work with verified local brokers who compete for your business—on your terms.',
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
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-2xl font-bold text-white">
                {step.number}
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

