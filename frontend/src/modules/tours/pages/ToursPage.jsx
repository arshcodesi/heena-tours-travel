import HeroBanner from "../components/HeroBanner.jsx";
import useTours from "../hooks/useTours.js";
import TourCard from "../components/TourCard.jsx";

export default function ToursPage() {
  const { tours, loading, error, reload } = useTours();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <HeroBanner />

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Available Tours
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Book verified Nainital & nearby routes with transparent pricing.
            </p>
          </div>

          <button
            onClick={reload}
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
          >
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-900">
              Loading tours…
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Please wait while we fetch the latest packages.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm font-extrabold text-red-900">
              Failed to load tours
            </p>
            <p className="mt-1 text-sm text-red-800">{error}</p>
            <p className="mt-3 text-xs text-red-700">
              Ensure backend is running and VITE_API_URL is correct.
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && tours.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-900">
              No tours available
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Tours will appear here once added by admin.
            </p>
          </div>
        )}

        {/* Tours Grid */}
        {!loading && !error && tours.length > 0 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}

        {/* Rent a Taxi or Bike Section */}
        <section className="mt-12 py-16 bg-gradient-to-br from-red-500 via-yellow-500 to-orange-500 rounded-3xl shadow-2xl overflow-hidden relative animate-pulse">
          {/* Flashing Background Effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-4 text-white text-8xl animate-bounce">🚗</div>
            <div className="absolute top-4 right-4 text-white text-8xl animate-bounce delay-500">🏍️</div>
            <div className="absolute bottom-4 left-4 text-white text-8xl animate-bounce delay-1000">🚀</div>
            <div className="absolute bottom-4 right-4 text-white text-8xl animate-bounce delay-1500">⚡</div>
          </div>

          {/* Glowing Border */}
          <div className="absolute inset-0 rounded-3xl border-4 border-white opacity-50 animate-ping"></div>

          <div className="relative container mx-auto px-4 text-center text-white">
            <h2 className="text-5xl font-black mb-6 animate-bounce drop-shadow-2xl tracking-wider">
              🔥 EXPLODE YOUR ADVENTURE! 🔥
            </h2>
            <p className="text-2xl mb-10 opacity-95 drop-shadow-lg font-bold">
              Rent a Taxi or Bike NOW – Fast, Fun, and Furious Tours Await!
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a
                href="tel:+919719030786"  // Replace with your actual taxi rental contact number
                className="inline-flex items-center justify-center bg-white text-red-600 px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:bg-red-100 hover:scale-125 hover:rotate-3 transition-all duration-700 transform glow-red"
              >
                🚗 RENT TAXI – CALL NOW!
              </a>
              <a
                href="tel:+919719030786"  // Replace with your actual bike rental contact number
                className="inline-flex items-center justify-center bg-white text-orange-600 px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:bg-orange-100 hover:scale-125 hover:rotate-3 transition-all duration-700 transform glow-orange"
              >
                🏍️ RENT BIKE – CALL NOW!
              </a>
            </div>
            <p className="mt-8 text-xl opacity-90 drop-shadow-md font-semibold animate-pulse">
              📞 Instant Booking • No Hassle • Best Prices Guaranteed!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}