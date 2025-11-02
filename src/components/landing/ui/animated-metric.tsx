'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useInView, animate } from 'framer-motion';
import { formatMetricValue, fadeInUp } from '../ui/primitives';

interface AnimatedMetricProps {
  label: string;
  value: string;
  prefersReducedMotion: boolean;
}

export function AnimatedMetric({ label, value, prefersReducedMotion }: AnimatedMetricProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });
  const numericValue = Number(value.replace(/[^0-9.]/g, ''));
  const hasNumericValue = !Number.isNaN(numericValue);
  const prefix = value.trim().startsWith('$') ? '$' : '';
  const suffixMatch = value.match(/[^0-9.,]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : '';
  const motionValue = useMotionValue(prefersReducedMotion || !hasNumericValue ? numericValue : 0);
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion || !hasNumericValue ? value : formatMetricValue(0, prefix, suffix),
  );

  useEffect(() => {
    if (prefersReducedMotion || !hasNumericValue) {
      setDisplayValue(value);
      return;
    }

    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(formatMetricValue(latest, prefix, suffix));
    });

    return () => unsubscribe();
  }, [motionValue, prefix, suffix, prefersReducedMotion, value, hasNumericValue]);

  useEffect(() => {
    if (prefersReducedMotion || !hasNumericValue || !isInView) return;

    const controls = animate(motionValue, numericValue, {
      duration: 1.6,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [prefersReducedMotion, isInView, motionValue, numericValue, hasNumericValue]);

  return (
    <motion.div
      ref={cardRef}
      variants={prefersReducedMotion ? undefined : fadeInUp}
      className="rounded-xl border border-neutral-100 bg-white px-7 py-8 shadow-lg shadow-neutral-900/10"
    >
      <div className="font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">{displayValue}</div>
      <div className="mt-2.5 text-xs uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">{label}</div>
    </motion.div>
  );
}
