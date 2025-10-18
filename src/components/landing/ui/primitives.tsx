import type { ReactNode } from 'react';

type ClassProps = {
  className?: string;
};

export const Pill = ({ children, className = '' }: { children: ReactNode } & ClassProps) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

export const H2 = ({ children, className = '' }: { children: ReactNode } & ClassProps) => (
  <h2
    className={`text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl lg:text-4xl ${className}`}
  >
    {children}
  </h2>
);

export const Subcopy = ({ children, className = '' }: { children: ReactNode } & ClassProps) => (
  <p className={`text-sm leading-6 text-neutral-600 ${className}`}>{children}</p>
);

export const LinkInline = ({ children }: { children: ReactNode }) => (
  <a
    href="#"
    className="underline underline-offset-4 decoration-neutral-400 transition-colors hover:text-neutral-900"
  >
    {children}
  </a>
);

export const Dot = ({ active = false }: { active?: boolean }) => (
  <span
    className={`inline-block h-2 w-5 rounded-full ${active ? 'bg-neutral-900' : 'bg-neutral-300'}`}
  />
);

export const SliderDots = ({ activeIndex = 0, className = '' }: { activeIndex?: number } & ClassProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {[0, 1, 2].map((i) => (
      <Dot key={i} active={i === activeIndex} />
    ))}
  </div>
);

export const Section = ({ id, children, className = '' }: { id: string; children: ReactNode } & ClassProps) => (
  <section id={id} className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

export const Card = ({ children, className = '' }: { children: ReactNode } & ClassProps) => (
  <div className={`rounded-3xl border border-neutral-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

export const MonoMark = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-emerald-700/80">
    <div className="grid h-6 w-6 place-items-center rounded-md border border-current bg-white/80 text-[10px] font-semibold shadow-sm">
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M12 2a7 7 0 00-7 7c0 4.2 5.2 11 7 13 1.8-2 7-8.8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 112.5-2.5 2.5 2.5 0 01-2.5 2.5z"
          fill="currentColor"
        />
      </svg>
    </div>
    <span className="text-xs uppercase tracking-[0.18em] opacity-75">{label}</span>
  </div>
);

export const CircleBadge = ({ children, className = '' }: { children: ReactNode } & ClassProps) => (
  <div
    className={`grid h-12 w-12 place-items-center rounded-full border border-emerald-200 bg-white/85 backdrop-blur ${className}`}
  >
    {children}
  </div>
);

export const TinyShield = ({ text = 'Verified by neighbors' }: { text?: string }) => (
  <div className="flex items-center gap-1 rounded-full border border-emerald-200 bg-white/95 px-2 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm">
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <path
        d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"
        fill="currentColor"
      />
    </svg>
    <span>{text}</span>
  </div>
);

export const WorkflowRow = ({ text, icon }: { text: string; icon: string }) => (
  <div className="flex items-center justify-between rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs shadow-sm">
    <span className="truncate">{text}</span>
    <span className="opacity-60">{icon}</span>
  </div>
);

export const SuggestionRow = ({ text, cta }: { text: string; cta: string }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 text-xs backdrop-blur">
    <span>{text}</span>
    <button className="rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 font-medium transition hover:bg-neutral-100">
      {cta}
    </button>
  </div>
);

export const IntegrationDot = ({ label }: { label: string }) => (
  <div className="grid place-items-center rounded-xl border border-neutral-200 bg-white p-3 text-xs text-neutral-700">
    {label}
  </div>
);

export const G2Badge = ({ text }: { text: string }) => (
  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900 shadow-sm">
    {text}
  </div>
);

export const CaseCard = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-900/90 to-neutral-900 p-4 text-white shadow-lg">
    <div className="mb-16 text-sm opacity-70">Logo</div>
    <div className="text-lg font-semibold">{title}</div>
    <div className="text-sm text-white/80">{subtitle}</div>
    <div className="mt-3 text-xs underline underline-offset-4">Case study →</div>
  </div>
);

export function formatMetricValue(raw: number, prefix: string, suffix: string) {
  const rounded = Math.round(raw);
  const formatted = Number.isNaN(rounded) ? '0' : rounded.toLocaleString();
  return `${prefix}${formatted}${suffix}`;
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
