export default function HeroBanner() {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/nainital.jpg"
            alt="Mountains"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
  
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
            Hina Tours & Travels
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Tours Around Nainital & Uttarakhand
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200">
            Premium local sightseeing, hill-station day trips, and curated multi-day tours with reliable vehicles and support.
          </p>
        </div>
      </section>
    );
  }