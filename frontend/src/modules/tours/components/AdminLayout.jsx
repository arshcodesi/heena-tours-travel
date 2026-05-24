import { Link, useNavigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth.js";

export default function AdminLayout({ children }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
              HT
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-slate-900">Tours Admin</p>
              <p className="text-xs text-slate-600">Heena Tours & Travels</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              to="/tours"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              View Tours
            </Link>

            <button
              onClick={() => navigate("/admin/tours")}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white hover:bg-slate-800"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Heena Tours & Travels — Admin Panel</p>
        </div>
      </footer>
    </div>
  );
}