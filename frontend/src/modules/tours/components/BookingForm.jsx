import { useMemo, useState } from "react";
import { createBooking } from "../api/toursApi.js";
import { normalizePhone } from "../utils/format.js";

/**
 * Props:
 * - tourId: string
 * - pricing: [{label, amount, unit}] used to build vehicle type options
 */
export default function BookingForm({ tourId, pricing = [] }) {
  const vehicleOptions = useMemo(() => {
    // Use pricing labels as vehicle types, plus a fallback
    const labels = (pricing || [])
      .map((p) => p?.label)
      .filter(Boolean);

    const unique = Array.from(new Set(labels));
    return unique.length ? unique : ["Bus", "Small Car", "Sumo", "Qualis", "Taxi"];
  }, [pricing]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [vehicleType, setVehicleType] = useState(vehicleOptions[0] || "");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const cleanPhone = normalizePhone(phone);

    if (!tourId) {
      setStatus({ type: "error", message: "Tour ID missing. Please refresh the page." });
      return;
    }

    if (cleanPhone.length < 10) {
      setStatus({ type: "error", message: "Please enter a valid phone number." });
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        tourId,
        name: name.trim(),
        phone: cleanPhone,
        date,
        vehicleType
      });

      setStatus({ type: "success", message: "Booking request sent successfully!" });
      setName("");
      setPhone("");
      setDate("");
      setVehicleType(vehicleOptions[0] || "");
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to submit booking." });
    } finally {
      setLoading(false);
    }
  }

  const messageClass =
    status.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-extrabold text-slate-900">Book this tour</p>
      <p className="mt-1 text-xs text-slate-600">
        Fill in your details and we’ll confirm availability quickly.
      </p>

      {status.message ? (
        <div className={`mt-4 rounded-xl border p-3 text-sm ${messageClass}`}>
          {status.message}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Name</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Phone</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit number"
              inputMode="tel"
              required
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Date</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Vehicle Type</label>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              {vehicleOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}