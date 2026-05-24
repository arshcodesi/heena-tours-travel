export default function TourListSkeleton() {
    // Shows 4 cards loading placeholders
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {[1, 2, 3, 4].map((key) => (
          <div
            key={key}
            className="animate-pulse rounded-3xl border border-slate-200 bg-white p-4"
          >
            <div className="h-48 w-full rounded-3xl bg-slate-200" />
            <div className="mt-4 h-6 w-3/4 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-1/2 rounded bg-slate-200" />
            <div className="mt-6 flex justify-between gap-6">
              <div className="h-5 w-12 rounded bg-slate-200" />
              <div className="h-5 w-12 rounded bg-slate-200" />
              <div className="h-5 w-12 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }