export default function ToursHero({ title, subtitle, stats = [] }) {
    return (
      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-premium">
        <div className="relative p-7 sm:p-10">
          {/* Subtle background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-white" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-slate-900/5 blur-2xl" />
  
          <div className="relative">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {subtitle}
            </p>
  
            <div className="mt-6 grid grid-cols-3 gap-3 sm:max-w-lg">
              {stats.slice(0, 3).map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <p className="text-xs text-slate-500">{s.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }