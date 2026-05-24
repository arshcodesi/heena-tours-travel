export default function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
    const alignClass =
      align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  
    return (
      <div className={`flex max-w-2xl flex-col gap-3 ${alignClass}`}>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            {eyebrow}
          </p>
        ) : null}
  
        <h2 className="font-display text-3xl leading-tight text-ink-900 sm:text-4xl">
          {title}
        </h2>
  
        {subtitle ? (
          <p className="text-base leading-relaxed text-ink-600">{subtitle}</p>
        ) : null}
      </div>
    );
  }