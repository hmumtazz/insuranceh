'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/primitives';

interface FAQProps {
  prefersReducedMotion: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do you protect my privacy?',
    answer: 'Your exact address is never shared. We only show an approximate location on the map. All personal information is anonymized, and we never share your contact details with brokers or other users.',
  },
  {
    question: 'Is RateNextDoor free to use?',
    answer: 'Yes, RateNextDoor is completely free for homeowners. You can browse rates, compare premiums, and participate in the forum at no cost. We believe transparent pricing should be accessible to everyone.',
  },
  {
    question: 'How accurate are the rates shown?',
    answer: 'All rates are submitted by verified homeowners in your area. While individual rates vary based on many factors (home size, age, coverage level, etc.), our data gives you a real picture of what your neighbors are paying for similar coverage.',
  },
  {
    question: 'How do I connect with brokers?',
    answer: 'Our broker network feature (coming soon) will allow you to browse verified local brokers who can provide quotes. You control when and how you engage with them—no unwanted calls or spam.',
  },
  {
    question: 'Can I use this to negotiate with my current insurer?',
    answer: 'Absolutely! Many users take our neighborhood rate data to their current insurer to negotiate better rates. Armed with real local data, you can make a stronger case for fair pricing.',
  },
];

export function FAQ({ prefersReducedMotion }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="py-16 sm:py-20">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-3xl"
      >
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Everything you need to know about RateNextDoor
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-neutral-50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="pr-8 text-lg font-semibold text-neutral-900">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

