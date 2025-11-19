'use client';

import { motion } from 'framer-motion';
import { testimonials, fadeInUp, staggerParent } from '../constants';

export function Testimonials({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl text-neutral-900 sm:text-4xl"
          >
            Homeowners who Already Used the Map.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-neutral-600"
          >
            Real stories from people who negotiated smarter after seeing local premiums.
          </motion.p>
        </div>

        <motion.div
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-120px' }}
          variants={prefersReducedMotion ? undefined : staggerParent}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={prefersReducedMotion ? undefined : fadeInUp}
              whileHover={
                prefersReducedMotion ? undefined : { y: -6, scale: 1.01, boxShadow: '0 18px 36px -24px rgba(17,17,17,0.35)' }
              }
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:border-neutral-300"
            >
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <svg
                    key={starIdx}
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-6 leading-relaxed text-neutral-800">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-lg font-semibold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
