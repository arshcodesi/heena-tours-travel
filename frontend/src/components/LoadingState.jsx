export default function LoadingState({ title = "Loading...", message = "Please wait.", variant = "loading" }) {
    return (
      <div
        role="alert"
        aria-busy="true"
        className="rounded-3xl border border-slate-200 bg-white p-14 text-center shadow-premium"
      >
        <svg
          className="mx-auto mb-4 h-10 w-10 animate-spin text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
      </div>
    );
  }