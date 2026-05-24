import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold " +
  "transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 " +
  "disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-brand-500 text-white shadow-soft hover:bg-brand-600 hover:shadow-lift",
  secondary:
    "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15",
  light:
    "bg-white text-ink-900 ring-1 ring-ink-200 hover:bg-ink-50",
  ghost:
    "bg-transparent text-ink-700 hover:bg-ink-100"
};

export default function Button({
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = [base, variants[variant] ?? variants.primary, className].join(" ");

  // Internal navigation
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // External link
  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Button
  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}