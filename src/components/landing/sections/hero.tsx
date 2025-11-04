'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedMetric } from '../ui/animated-metric';
import { metrics, staggerParent } from '../constants';

interface HeroProps {
  prefersReducedMotion: boolean;
  onSignupClick: () => void;
}

export function Hero({ prefersReducedMotion, onSignupClick }: HeroProps) {
  const heroOrbAnimation = useMemo(
    () =>
      prefersReducedMotion
        ? { opacity: 0.55 }
        : {
            opacity: [0.35, 0.6, 0.35],
            y: [-10, 15, -10],
            scale: [1, 1.08, 1],
          },
    [prefersReducedMotion],
  );

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-background-v2.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fbc49b]/45 via-[#f6a874]/40 to-white/90" />
      <motion.div
        aria-hidden
        className="absolute -left-12 top-24 -z-10 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl"
        animate={heroOrbAnimation}
        transition={{
          duration: 18,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-16 bottom-10 -z-10 h-80 w-80 rounded-full bg-sky-300/40 blur-3xl"
        animate={heroOrbAnimation}
        transition={{
          duration: 22,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 text-center sm:px-6 sm:pt-28 md:pt-32 lg:px-8 lg:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          See what your Neighbors Pay for Home Insurance,<br />
          then Pay Less.
        </motion.h1>


        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            onClick={onSignupClick}
            className="rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-neutral-900/20 transition-colors hover:bg-black"
          >
            Create a Free Account
          </motion.button>
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96, y: 0 }}
          >
            <Link
              href="/rates/map"
              className="rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-neutral-900/20 transition-colors hover:bg-black"
            >
              Explore the Rate Map
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-100px' }}
          variants={prefersReducedMotion ? undefined : staggerParent}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {metrics.map((metric) => (
            <AnimatedMetric
              key={metric.label}
              label={metric.label}
              value={metric.value}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
