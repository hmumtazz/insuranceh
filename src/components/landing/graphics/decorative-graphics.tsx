export const SkySunset = () => (
  <div className="relative h-28 w-full overflow-hidden rounded-2xl md:h-24">
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-teal-50 to-sky-100" />
    <div className="absolute -right-8 top-0 h-full w-40 rotate-6 bg-gradient-to-b from-teal-300/60 to-sky-100/40" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-white/55 via-transparent to-transparent" />
    <div className="absolute inset-4 grid grid-cols-6 gap-2 opacity-60">
      {Array.from({ length: 18 }).map((_, idx) => (
        <span
          key={`grid-cell-${idx}`}
          className={`rounded-md ${idx % 5 === 0 ? 'bg-white/80' : 'bg-white/40'} shadow-sm backdrop-blur`}
        />
      ))}
    </div>
  </div>
);

export const NeighborhoodPanorama = ({ warm = false }: { warm?: boolean }) => (
  <div className="relative h-80 w-full overflow-hidden rounded-3xl md:h-96">
    <div
      className={`absolute inset-0 ${
        warm
          ? 'bg-gradient-to-t from-rose-100 via-amber-50 to-emerald-50'
          : 'bg-gradient-to-t from-sky-100 via-emerald-50 to-cyan-50'
      }`}
    />
    <div className="absolute left-0 bottom-0 h-3/4 w-2/3 -skew-x-6 rounded-tr-[6rem] bg-gradient-to-tr from-teal-300/55 via-cyan-200/45 to-emerald-200/35" />
    <div className="absolute right-0 bottom-0 h-2/3 w-2/3 -skew-x-3 rounded-tl-[6rem] bg-gradient-to-tl from-amber-300/55 via-rose-200/45 to-orange-200/35" />
    <div className="absolute inset-x-0 bottom-10 mx-6 h-16 rounded-full bg-white/60 blur-xl" />
    <div className="absolute inset-x-8 top-10 grid grid-cols-5 gap-3">
      {Array.from({ length: 15 }).map((_, idx) => (
        <div
          key={`home-card-${idx}`}
          className={`h-16 rounded-2xl border border-white/40 bg-white/45 backdrop-blur-sm shadow-sm ${
            idx % 5 === 2 ? 'col-span-2' : ''
          }`}
        >
          <div className="flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600/70">
            {idx % 3 === 0 ? 'Map Pin' : idx % 3 === 1 ? 'Rate' : 'Badge'}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RiverValley = () => (
  <div className="relative h-96 w-full overflow-hidden rounded-3xl">
    <div className="absolute inset-0 bg-gradient-to-t from-emerald-100 via-cyan-50 to-white" />
    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-emerald-200/50 via-teal-200/40 to-transparent" />
    <div className="absolute inset-x-20 bottom-0 top-24 rounded-[4rem] bg-cyan-300/45 blur-md" />
    <div className="absolute left-0 top-10 h-64 w-40 rotate-6 bg-sky-300/35" />
    <div className="absolute right-0 top-16 h-64 w-52 -rotate-6 bg-emerald-300/40" />
    <div className="absolute inset-x-10 inset-y-16 rounded-[3rem] border border-white/40 bg-white/30 backdrop-blur">
      <div className="absolute inset-6 grid grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={`advisor-card-${idx}`}
            className="rounded-2xl border border-emerald-200/60 bg-white/70 p-3 text-[11px] font-medium text-emerald-700 shadow-sm"
          >
            {idx % 2 === 0 ? 'Carrier trend' : 'Neighbor benchmark'}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-8 bottom-8 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600/70">
        <span>March</span>
        <span>April</span>
        <span>May</span>
      </div>
    </div>
  </div>
);
