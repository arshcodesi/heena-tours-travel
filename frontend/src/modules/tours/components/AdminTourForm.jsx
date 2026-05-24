import { useEffect, useMemo, useState } from "react";

/**
 * Admin form supports:
 * - name, duration
 * - covers (comma-separated)
 * - includes (comma-separated)
 * - pricing rows (dynamic)
 * - imageUrl, mapQuery
 * - contact numbers
 * - active toggle
 *
 * Backend expects:
 * {
 *   name, duration, covers:[], includes:[],
 *   pricing:[{label, amount, unit}],
 *   imageUrl, mapQuery, contactPhone, contactWhatsApp, active
 * }
 */

function defaultPricingRow() {
  return { label: "", amount: "", unit: "per_vehicle" };
}

export default function AdminTourForm({ title, initialValue, saving, onSubmit }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const [coversText, setCoversText] = useState("");
  const [includesText, setIncludesText] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [mapQuery, setMapQuery] = useState("");

  const [contactPhone, setContactPhone] = useState("+919719030786");
  const [contactWhatsApp, setContactWhatsApp] = useState("919719030786");

  const [active, setActive] = useState(true);
  const [pricing, setPricing] = useState([defaultPricingRow()]);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialValue) return;

    setName(initialValue.name || "");
    setDuration(initialValue.duration || "");
    setCoversText((initialValue.covers || []).join(", "));
    setIncludesText((initialValue.includes || []).join(", "));
    setImageUrl(initialValue.imageUrl || "");
    setMapQuery(initialValue.mapQuery || "");
    setContactPhone(initialValue.contactPhone || "+919719030786");
    setContactWhatsApp((initialValue.contactWhatsApp || "919719030786").replace("+", ""));
    setActive(typeof initialValue.active === "boolean" ? initialValue.active : true);

    const pr = Array.isArray(initialValue.pricing) && initialValue.pricing.length
      ? initialValue.pricing.map((p) => ({
          label: p.label || "",
          amount: p.amount ?? "",
          unit: p.unit || "per_vehicle"
        }))
      : [defaultPricingRow()];

    setPricing(pr);
  }, [initialValue]);

  const covers = useMemo(() => {
    return coversText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [coversText]);

  const includes = useMemo(() => {
    return includesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [includesText]);

  function updatePricingRow(index, patch) {
    setPricing((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function addPricingRow() {
    setPricing((prev) => [...prev, defaultPricingRow()]);
  }

  function removePricingRow(index) {
    setPricing((prev) => prev.filter((_, i) => i !== index));
  }

  function buildPayload() {
    // Validate pricing rows: only keep rows with label + amount
    const cleanedPricing = (pricing || [])
      .map((r) => ({
        label: String(r.label || "").trim(),
        amount: r.amount === "" ? null : Number(r.amount),
        unit: r.unit || "per_vehicle"
      }))
      .filter((r) => r.label.length > 0 && r.amount !== null && !Number.isNaN(r.amount));

    return {
      name: name.trim(),
      duration: duration.trim(),
      covers,
      includes,
      pricing: cleanedPricing,
      imageUrl: imageUrl.trim(),
      mapQuery: mapQuery.trim() || `${name.trim()} Nainital Uttarakhand`,
      contactPhone: contactPhone.trim(),
      contactWhatsApp: contactWhatsApp.trim(),
      active: Boolean(active)
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Tour name is required.");
      return;
    }
    if (!duration.trim()) {
      setError("Duration is required (e.g., One Day – 10:00 AM – Taxi).");
      return;
    }

    const payload = buildPayload();
    await onSubmit(payload);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Admin Form
        </p>
        <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">
          Fill details carefully. Active tours are visible on the public Tours page.
        </p>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Basic */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Tour Name</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="KAUSANI"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Duration / Time</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Two Day – 9:30 AM – Bus or Taxi"
              required
            />
          </div>
        </div>

        {/* Covers */}
        <div>
          <label className="text-xs font-semibold text-slate-700">
            Covered Places (comma-separated)
          </label>
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            rows={3}
            value={coversText}
            onChange={(e) => setCoversText(e.target.value)}
            placeholder="Bhowali, Kainchi Temple, Almora, Kausani..."
          />
          <p className="mt-2 text-xs text-slate-500">
            Example: Bhimtal, Sattal, Naukuchiatal
          </p>
        </div>

        {/* Includes */}
        <div>
          <label className="text-xs font-semibold text-slate-700">
            Includes (comma-separated) (optional)
          </label>
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            rows={3}
            value={includesText}
            onChange={(e) => setIncludesText(e.target.value)}
            placeholder="Lodging, Boarding, Tea, Dinner, Breakfast..."
          />
        </div>

        {/* Pricing */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-slate-900">Pricing Rows</p>
              <p className="mt-1 text-xs text-slate-600">
                Add dynamic pricing: Bus per head, Small car per vehicle, etc.
              </p>
            </div>
            <button
              type="button"
              onClick={addPricingRow}
              className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white hover:bg-slate-800"
            >
              + Add Row
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {pricing.map((row, idx) => (
              <div
                key={idx}
                className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-12"
              >
                <div className="sm:col-span-6">
                  <label className="text-xs font-semibold text-slate-700">Label</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                    value={row.label}
                    onChange={(e) => updatePricingRow(idx, { label: e.target.value })}
                    placeholder="Small Car / Bus (per head)"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-slate-700">Amount (₹)</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                    value={row.amount}
                    onChange={(e) => updatePricingRow(idx, { amount: e.target.value })}
                    placeholder="4000"
                    inputMode="numeric"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-slate-700">Unit</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                    value={row.unit}
                    onChange={(e) => updatePricingRow(idx, { unit: e.target.value })}
                  >
                    <option value="per_vehicle">Per Vehicle</option>
                    <option value="per_head">Per Head</option>
                  </select>
                </div>

                <div className="sm:col-span-12 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removePricingRow(idx)}
                    className="rounded-xl bg-red-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-red-700"
                    disabled={pricing.length === 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media + Map */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Image URL (optional)</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Map Query (optional)</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              value={mapQuery}
              onChange={(e) => setMapQuery(e.target.value)}
              placeholder="Kausani Uttarakhand"
            />
          </div>
        </div>

        {/* Contacts + Active */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-semibold text-slate-700">Call Phone</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+919719030786"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">WhatsApp Number</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              value={contactWhatsApp}
              onChange={(e) => setContactWhatsApp(e.target.value)}
              placeholder="919719030786"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="active" className="text-sm font-extrabold text-slate-900">
              Active
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Tour"}
          </button>

          <p className="text-xs text-slate-500">
            Tip: Keep covers/includes comma separated. Pricing rows require label + amount.
          </p>
        </div>
      </form>
    </div>
  );
}