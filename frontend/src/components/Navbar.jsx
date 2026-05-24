import { NavLink, Link } from "react-router-dom";

const navLinkBase =
  "text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors";
const navLinkActive = "text-slate-900";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-premium">
            HT
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-950">
              Hina Tours And Travel
            </p>
            <p className="text-xs text-slate-500">Tours • Hotels • Properties</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ""}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ""}`
            }
          >
            Tours
          </NavLink>
          <NavLink
            to="/hotels"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ""}`
            }
          >
            Hotels
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ""}`
            }
          >
            Properties
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+911234567890"
            className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
            aria-label="Call now"
          >
            Call Now
          </a>
          <a
            href="https://wa.me/911234567890"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-premium transition hover:bg-slate-800"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile quick links */}
      <div className="border-t border-slate-200/70 sm:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 text-xs">
          <Link className="text-slate-700 hover:text-slate-900" to="/tours">
            Tours
          </Link>
          <Link className="text-slate-700 hover:text-slate-900" to="/hotels">
            Hotels
          </Link>
          <Link
            className="text-slate-700 hover:text-slate-900"
            to="/properties"
          >
            Properties
          </Link>
        </div>
      </div>
    </header>
  );
}