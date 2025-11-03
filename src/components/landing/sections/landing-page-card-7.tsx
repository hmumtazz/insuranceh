'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface LandingPageCard7Props {
  onSignupClick: () => void;
}

export function LandingPageCard7({ onSignupClick }: LandingPageCard7Props) {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <div className="rounded-3xl bg-neutral-900 p-10 text-white shadow-xl md:flex md:items-center md:justify-between md:gap-10 md:p-14">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl">
              Join the Movement for Fair Insurance
            </h3>
            <p className="mt-3 max-w-xl text-neutral-300">
            Every rate shared helps homeowners like you get the transparency they deserve—join thousands already making a difference.
            </p>
          </div>
          <div className="mt-6 flex gap-3 md:mt-0">
            <button
              onClick={onSignupClick}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-100"
            >
              Start for Free
            </button>
            <Link
              href="/rates/submit"
              className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Share my Rate
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
