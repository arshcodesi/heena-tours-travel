import Container from "../layout/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Reveal from "../ui/Reveal.jsx";

/**
 * Gallery images:
 * - This uses premium Unsplash URLs by default (works immediately).
 * - To use LOCAL images:
 *   1) create: public/images/gallery/
 *   2) add files like: g1.jpg, g2.jpg, g3.jpg...
 *   3) replace the urls below with: "/images/gallery/g1.jpg" etc.
 */
const IMAGES = [
  {
    src: "/images/nainital.jpg",
    alt: "Nainital"
  },
  {
    src: "/images/bhimtal.jpg",
    alt: "Bhimtal"
  },
  {
    src: "/images/room.jpg",
    alt: "Luxury hotel resort"
  },
  {
    src: "/images/sunset.jpg",
    alt: "City skyline at sunset"
  },
  {
    src: "/images/road.jpg",
    alt: "Road trip travel view"
  },
  {
    src: "/images/last.jpg",
    alt: "Modern city travel destination"
  }
];

function GalleryCard({ src, alt, priority = false }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-ink-100 shadow-soft ring-1 ring-white/60">
      {/* Gradient overlay for premium look */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/45 via-ink-900/0 to-ink-900/0 opacity-90" />

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-64"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-sm font-semibold text-white drop-shadow">{alt}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="bg-ink-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Gallery"
            title="Destinations that feel premium from the first glance"
            subtitle="A glimpse of the kind of experiences we help you book—comfort-first, scenic, and well planned."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {IMAGES.map((img, idx) => (
              <Reveal key={img.src}>
                <GalleryCard src={img.src} alt={img.alt} priority={idx < 2} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-ink-700">
                Want a custom package? Tell us your destination + dates, and we’ll share
                the best options for tours, hotels, and properties.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}