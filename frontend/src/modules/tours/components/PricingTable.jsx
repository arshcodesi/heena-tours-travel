import { formatINR } from "../utils/format.js";

/**
 * pricing shape (array):
 * [
 *   { label: "Bus (per head)", amount: 800, unit: "per_head" },
 *   { label: "Small Car", amount: 4000, unit: "per_vehicle" },
 * ]
 */
export default function PricingTable({ pricing = [] }) {
  if (!Array.isArray(pricing) || pricing.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Pricing</p>
        <p className="mt-1 text-slate-600">Pricing will be shared on call/WhatsApp.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <p className="text-sm font-extrabold text-slate-900">Pricing</p>
        <p className="text-xs font-semibold text-slate-600">Transparent rates</p>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="sr-only">
          <tr>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {pricing.map((row, idx) => {
            const label = row?.label ?? "—";
            const amount = row?.amount;
            const unit = row?.unit;

            const unitText =
              unit === "per_head"
                ? "/ head"
                : unit === "per_vehicle"
                  ? "/ vehicle"
                  : unit
                    ? `/${unit}`
                    : "";

            return (
              <tr
                key={`${label}-${idx}`}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              >
                <td className="px-4 py-3 font-semibold text-slate-900">{label}</td>
                <td className="px-4 py-3 text-slate-700">
                  <span className="font-extrabold text-slate-900">{formatINR(amount)}</span>
                  <span className="ml-1 text-slate-500">{unitText}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="border-t border-slate-100 bg-white px-4 py-3">
        <p className="text-xs text-slate-500">
          Notes: Prices may vary by season/availability. Confirm final quote on booking.
        </p>
      </div>
    </div>
  );
}