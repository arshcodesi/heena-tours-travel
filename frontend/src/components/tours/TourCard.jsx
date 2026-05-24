import { useState } from "react";

export default function TourCard({ tour }) {
  // Extract data safely with defaults
  const {
    name = "Unknown Tour",
    distance = "N/A",
    prices = [],           // Array of pricing objects: { label, amount, unit }
    description = "",
    images = [],
    contactPhone = "+919719030786",
    contactWhatsApp = "919719030786",
    mapEmbed = null,       // Optionally, if you have a map embed URL
  } = tour;

  const [imgError, setImgError] = useState(false);
  const imgSrc = images[0] || "";

  const whatsappNumber = contactWhatsApp.replace("+", "");

  return (
    <article className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white shadow hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={`Image of ${name}`}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
            No Image Available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-4 sm:p-5">
        {/* Tour Name and Distance */}
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{name}</h3>
        <p className="text-xs font-medium text-slate-700">{distance}</p>

        {/* Description */}
        <p className="flex-1 text-sm text-slate-600 line-clamp-3">{description}</p>

        {/* Pricing Table */}
        <div className="rounded-md bg-gray-50 p-4 mb-4 border border-gray-200">
          <h4 className="mb-2 font-semibold text-gray-900">Pricing</h4>
          {prices.length === 0 ? (
            <p className="text-sm text-gray-700">Pricing will be shared on call/WhatsApp.</p>
          ) : (
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 pr-4 text-sm font-medium text-gray-700">Type</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {prices.map(({ label, amount, unit }, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-200 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                  >
                    <td className="py-2 pr-4 text-sm text-gray-800">{label}</td>
                    <td className="py-2 text-right text-sm font-semibold text-gray-900">
                      ₹{amount.toLocaleString()} {unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Map Embed - Optional */}
        {mapEmbed && (
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-300">
            <iframe
              src={mapEmbed}
              title={`Map for ${name}`}
              className="w-full h-64 border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {/* Contact Buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello, I want to inquire about: ${name}`)}`}
            className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-extrabold text-white hover:bg-green-700"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a
            href={`tel:${contactPhone}`}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-extrabold text-white hover:bg-slate-800"
          >
            Call Now
          </a>
        </div>
      </div>
    </article>
  );
}