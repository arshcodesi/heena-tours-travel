import { NavLink } from "react-router-dom";
import Container from "./Container.jsx";
import Button from "../ui/Button.jsx";
import { HiOutlinePhone, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "text-sm font-semibold transition",
          isActive ? "text-brand-600" : "text-ink-700 hover:text-ink-900",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function SiteHeader() {
  const phoneNumber = "+919719030786";
  const whatsappNumber = "919719030786";

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-ink-50/80 backdrop-blur">
      <Container className="py-4">

        <div className="flex items-center justify-between">

          {/* LOGO + BRAND */}
          <NavLink to="/" className="flex items-center gap-3">

            {/* LOGO IMAGE */}
            <img
              src="/logo.png"
              alt="Hina Tours & Travel"
              className="h-20 w-20 rounded-full object-cover "
            />

            {/* BRAND TEXT */}
            <div className="flex flex-col justify-center">
              <span className="text-lg font-bold text-ink-900 leading-tight">
                Hina
              </span>
              <span className="text-xs font-semibold tracking-wide text-ink-500">
                Tours & Travel
              </span>
            </div>

          </NavLink>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/tours">Tours</NavItem>
            <NavItem to="/hotels">Hotels</NavItem>
            <NavItem to="/properties">Properties</NavItem>
          </nav>

          {/* CONTACT BUTTONS */}
          <div className="hidden sm:flex items-center gap-3">

            <Button
              variant="ghost"
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="flex items-center gap-1"
            >
              <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
              WhatsApp
            </Button>

            <Button
              variant="light"
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-1"
            >
              <HiOutlinePhone className="h-5 w-5" />
              Call
            </Button>

          </div>

        </div>

      </Container>
    </header>
  );
}
