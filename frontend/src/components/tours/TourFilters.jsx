export default function TourFilters({
    query,
    onQueryChange,
    vehicle,
    onVehicleChange,
    maxBudget,
    onMaxBudgetChange,
    maxBudgetLimit,
  }) {
    const vehicles = [
      { key: "bike", label: "Bike" },
      { key: "car", label: "Car" },
      { key: "bus", label: "Bus" },
    ];
  
    const safeLimit = Number.isFinite(maxBudgetLimit) && maxBudgetLimit > 0 ? maxBudgetLimit : 50000;
    const safeBudget = Number.isFinite(maxBudget) ? Math.min(maxBudget, safeLimit) : safeLimit;
  
    function clearFilters() {
      onQueryChange("");
      onVehicleChange("car");
      onMaxBudgetChange(safeLimit);
    }
  
    return (
      <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
            <p className="mt-1 text-xs text-slate-500">Refine results</p>
          </div>
  
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Clear all filters"
          >
            Clear
          </button>
        </div>
  
        {/* Search */}
        <div className="mt-5">
          <label className="text-xs font-medium text-slate-700" htmlFor="tourSearch">
            Search
          </label>
          <input
            id="tourSearch"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by location or distance..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
          />
          <p className="mt-2 text-[11px] text-slate-500">
            Tip: Try “jaipur”, “goa”, or “200km”.
          </p>
        </div>
  
        {/* Vehicle */}
        <div className="mt-6">
          <p className="text-xs font-medium text-slate-700">Vehicle Pricing</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {vehicles.map((v) => {
              const active = vehicle === v.key;
              return (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => onVehicleChange(v.key)}
                  className={[
                    "rounded-xl border px-3 py-2 text-sm font-medium shadow-sm transition",
                    active
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                  ].join(" ")}
                  aria-pressed={active}
                  aria-label={`Select ${v.label} pricing`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
  
        {/* Budget */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-700" htmlFor="budgetRange">
              Max Budget
            </label>
            <span className="text-xs font-semibold text-slate-900" aria-label="Selected budget">
              ₹{safeBudget.toLocaleString()}
            </span>
          </div>
  
          <input
            id="budgetRange"
            type="range"
            min={0}
            max={safeLimit}
            step={100}
            value={safeBudget}
            onChange={(e) => onMaxBudgetChange(Number(e.target.value))}
            className="mt-3 w-full accent-slate-900"
            aria-label="Maximum budget slider"
          />
  
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>₹0</span>
            <span>₹{safeLimit.toLocaleString()}</span>
          </div>
        </div>
  
        {/* Info */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium text-slate-900">Why filters?</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Select a vehicle type to compare the right pricing, and set a budget to see only relevant packages.
          </p>
        </div>
      </aside>
    );
  }