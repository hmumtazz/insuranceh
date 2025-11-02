'use client';

import { motion } from 'framer-motion';

interface MissionStatementProps {
  prefersReducedMotion: boolean;
}

const insuranceCarriers = [
  { name: 'State Farm', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/State_Farm_logo.svg' },
  { name: 'Mercury Insurance', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/02/MI_CorpLogo_Horz_WEB_Hex-990000_BLACK.jpg' },
  { name: 'Progressive', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Logo_of_the_Progressive_Corporation.svg' },
  { name: 'Allstate', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Allstate_wordmark.svg' },
  { name: 'Liberty Mutual', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Liberty_Mutual_logo.svg' },
  { name: 'GEICO', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Geico_logo.svg' },
  { name: 'Farmers Insurance', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Farmers_Insurance_Group_logo.svg' },
  { name: 'Nationwide', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Nationwide_Insurance.svg' },
  { name: 'Travelers', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Trav_umb_5inch.jpg' },
  { name: 'USAA', logo: 'https://upload.wikimedia.org/wikipedia/en/e/ec/USAA_logo.svg' },
];

const featureItems = [
  {
    title: 'Community Driven',
    description: 'See what your neighbors actually pay. Filter by carrier, coverage type, and renewal date to find the most relevant comparisons.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Privacy-first design',
    description: 'Your personal information is never shared. We only show aggregated, anonymized data, no contact details, ever.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11c-1.657 0-3 1.567-3 3.5S10.343 18 12 18s3-1.567 3-3.5S13.657 11 12 11zm0 0V7a4 4 0 10-8 0v4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 21h14a2 2 0 002-2v-5.5a2 2 0 00-2-2H5a2 2 0 00-2 2V19a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Negotiation ready',
    description: 'Get a detailed market report showing local rates and carrier trends. Armed with real data, you can negotiate confidently.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-6m6 6V7m-7 6h8"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 21V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16"
        />
      </svg>
    ),
  },
  {
    title: 'Broker',
    description: 'Connect with verified local brokers who compete for your business. You reach out to them if you want.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
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

export function MissionStatement({ prefersReducedMotion }: MissionStatementProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#eef2ff] to-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,_rgba(255,180,120,0.42),_transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(219,234,254,0.55),_transparent_68%)]" />
      <div className="absolute -top-32 right-24 -z-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute top-24 right-0 -z-10 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="absolute bottom-0 left-20 -z-10 h-80 w-80 rounded-full bg-slate-200/45 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">
              <span className="h-px w-10 bg-sky-500/60" />
              Designed for homeowners who negotiate
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-4xl leading-tight text-neutral-900 sm:text-5xl">
                Privacy-first. Always community-driven. Your data is never shared, never sold.
              </h2>

              <p className="max-w-2xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
                Compare real insurance premiums from homeowners in your neighborhood. Find better rates, connect with local brokers, and negotiate with confidence.
              </p>
            </div>

            {/* Integrated Marquee Bar */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-neutral-600">Compare quotes from leading carriers</p>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl border border-white/60 bg-white/50 py-6 backdrop-blur-sm">
                <style jsx>{`
                  @keyframes scroll-left {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }
                  .animate-scroll {
                    animation: scroll-left 30s linear infinite;
                  }
                  .animate-scroll:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className="flex animate-scroll items-center gap-12">
                  {[...insuranceCarriers, ...insuranceCarriers].map((carrier, i) => (
                    <div
                      key={i}
                      className="flex shrink-0 items-center justify-center opacity-60 transition duration-300 hover:opacity-100"
                    >
                      <img
                        src={carrier.logo}
                        alt={carrier.name}
                        className="h-8 w-28 object-contain grayscale hover:grayscale-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {featureItems.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2 + index * 0.08 }}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg shadow-neutral-900/25">
                    {feature.icon}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-sm text-neutral-500"
            >
            </motion.p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="relative w-[200%] overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-12 shadow-2xl shadow-sky-200/40 backdrop-blur"
          >
            <div className="absolute -top-20 right-16 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl" />
            <div className="absolute top-24 right-[-3rem] h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,138,76,0.45),_transparent_70%)] blur-3xl" />
            <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-slate-200/45 blur-3xl" />

            <div className="relative space-y-10">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Live benchmarks
                </span>
                <h3 className="font-serif text-3xl leading-snug text-neutral-900">
                  Insurance data, finally on your side.
                </h3>
              </div>

              <dl className="grid gap-6 rounded-2xl border border-white/60 bg-white/70 p-6 text-neutral-900 shadow-inner shadow-white/40">
                <div className="flex flex-col">
                  <dt className="text-sm text-neutral-500">Members who uncover savings</dt>
                  <dd className="font-serif text-4xl font-semibold text-neutral-900">98%</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm text-neutral-500">Time to compare quotes</dt>
                  <dd className="font-serif text-3xl font-semibold text-neutral-900">5 mins</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm text-neutral-500">Spam in your inbox</dt>
                  <dd className="font-serif text-3xl font-semibold text-emerald-600">0</dd>
                </div>
                  <div className="flex flex-col">
                    <dt className="text-sm text-neutral-500">Calls to your phone</dt>
                    <dd className="font-serif text-3xl font-semibold text-emerald-600">0</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
