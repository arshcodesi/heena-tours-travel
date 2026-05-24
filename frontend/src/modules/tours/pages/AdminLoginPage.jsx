import { useState } from "react";
import { adminLogin } from "../api/toursApi.js";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminLogin({ email, password });

      localStorage.setItem("ht_admin_token", data.token);
      localStorage.setItem("ht_admin_email", data.admin?.email || email);

      window.location.href = "/admin/tours";
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Admin Login
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
            Tours Admin Panel
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Login to manage tours (add/edit/delete/pricing/active status).
          </p>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-800">Email</label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-800">Password</label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Logging in…" : "Login"}
            </button>

            <p className="text-xs text-slate-500">
              Security tip: use a strong password and change it regularly.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}