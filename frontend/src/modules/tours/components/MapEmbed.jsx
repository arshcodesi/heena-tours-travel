export default function MapEmbed({ query }) {
    const q = encodeURIComponent(query || "Nainital Uttarakhand");
    const src = `https://www.google.com/maps?q=${q}&output=embed`;
  
    return (
      <div className="overflow-hidden rounded-2xl border bg-white">
        <div className="aspect-[16/9] w-full">
          <iframe
            title={`Map - ${query || "Nainital"}`}
            src={src}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    );
  }