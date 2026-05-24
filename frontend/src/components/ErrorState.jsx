export default function ErrorState({ title = "Error", message = "Something went wrong.", actions = [] }) {
    return (
      <div className="rounded-3xl border border-red-300 bg-red-50 p-14 text-center shadow-premium">
        <h3 className="mb-4 text-lg font-semibold text-red-700">{title}</h3>
        <p className="mb-6 text-sm text-red-700">{message}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {actions.map(({ label, onClick }, i) => (
            <button
              key={i}
              type="button"
              onClick={onClick}
              className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }