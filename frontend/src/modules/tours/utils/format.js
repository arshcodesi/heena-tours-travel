export function formatINR(amount) {
    if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return "—";
    const n = Number(amount);
    return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
  }
  
  export function normalizePhone(phone) {
    return String(phone || "").replace(/[^\d+]/g, "");
  }