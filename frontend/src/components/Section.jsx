export default function Section({ title, subtitle, children }) {
    return (
      <section className="py-10 sm:py-14">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </section>
    );
  }