export const metrics = [
  { label: 'Active members', value: '12,400+' },
  { label: 'Rates compared', value: '48,200+' },
  { label: 'Avg. savings', value: '$840/yr' },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    initials: 'SC',
    location: 'Denver, CO',
    quote:
      'I saw three neighbors paying $200 less for similar coverage. Used that data to renegotiate my premium down 18%.',
  },
  {
    name: 'Marcus Johnson',
    initials: 'MJ',
    location: 'Austin, TX',
    quote:
      'The map showed me I was overpaying by nearly $300/year. Switched carriers and got better coverage for less.',
  },
  {
    name: 'Emily Rodriguez',
    initials: 'ER',
    location: 'Portland, OR',
    quote:
      'Finally had real data to work with instead of just guessing. Saved over $600 on my renewal.',
  },
];

export const featureCards = [
  {
    tagline: 'Real Data',
    title: 'See what neighbors actually pay',
    copy: 'Anonymous, verified premium data from your neighborhood. No estimates, no marketing fluff.',
  },
  {
    tagline: 'Smart Comparison',
    title: 'Compare apples to apples',
    copy: 'Filter by home type, coverage level, and deductible. Find truly comparable rates.',
  },
  {
    tagline: 'Negotiation Power',
    title: 'Negotiate with confidence',
    copy: 'Armed with real data, you can push back on inflated quotes and renewal increases.',
  },
];

export const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};
