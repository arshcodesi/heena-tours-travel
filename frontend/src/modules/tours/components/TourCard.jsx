import MapEmbed from "./MapEmbed.jsx";
import PricingTable from "./PricingTable.jsx";
// Removed BookingForm import since we won't use it

export default function TourCard({ tour }) {
  const phoneNumber = tour?.contactPhone || "+9199719030786";
  const whatsappNumber = (tour?.contactWhatsApp || "919719030786").replace("+", "");

  const mapQuery =
    tour?.mapQuery ||
    `${tour?.name || "Tour"} ${tour?.region || "Nainital Uttarakhand"}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Top Image */}
      <div className="relative h-48 w-full bg-slate-200">
        <img
          src={tour?.imageUrl || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"}
          alt={tour?.name || "Tour"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/0 to-slate-950/0" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-extrabold text-white">{tour?.name}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-200">{tour?.duration}</p>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6">
        {/* Covered places */}
        <div>
          <p className="text-sm font-extrabold text-slate-900">Covers</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {(tour?.covers || []).map((place) => (
              <li
                key={place}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {place}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Table */}
        <PricingTable pricing={tour?.pricing || []} />

        {/* Map */}
        <MapEmbed query={mapQuery} />

        {/* Pricing + Call to Action Buttons – removed booking form */}
        <div className="grid gap-4">
          {/* Optionally, you can add more detailed pricing info here if needed */}

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hello, I want to inquire about: ${tour?.name}`
              )}`}
              className="rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-extrabold text-white hover:bg-green-700"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <a
              href={`tel:${phoneNumber}`}
              className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-extrabold text-white hover:bg-slate-800"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}