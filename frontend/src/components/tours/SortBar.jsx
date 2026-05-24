export default function SortBar({ total, sortBy, onSortChange }) {
    return (
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">{total} packages found</p>
        <label className="ml-4 flex items-center gap-x-2 text-sm text-slate-600">
          Sort by:
          <select
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 outline-none focus:border-slate-500"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort packages"
          >
            <option value="recommended">Recommended</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>
    );
  }