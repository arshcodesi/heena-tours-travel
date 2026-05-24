import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";
import { HiArrowRight, HiOutlineMapPin } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="hero-surface relative isolate overflow-hidden">
      {/* Decorative blur blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-white">
            <Reveal animation="animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold ring-1 ring-white/20">
                <HiOutlineMapPin className="h-4 w-4" />
                Trusted travel planning • Verified stays • 24/7 support
              </div>
            </Reveal>

            <Reveal className="mt-5" animation="animate-fade-up">
            <div className="text-center leading-none">
  <h1
    className="font-display text-7xl sm:text-8xl lg:text-[9rem] font-normal"
    style={{ fontFamily: "'Parisienne', cursive" }}
  >
    Hina
  </h1>

  <h2 className="mt-1 text-lg sm:text-xl lg:text-2xl font-semibold tracking-[0.35em] uppercase text-white/90">
    Tours & Travel
  </h2>
</div>



              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Explore Tours • Hotels • Properties with Comfort
              </p>
            </Reveal>

            <Reveal className="mt-8" animation="animate-fade-up">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button to="/tours" variant="primary" className="shadow-lift">
                  Explore Tours <HiArrowRight className="h-5 w-5" />
                </Button>
                <Button to="/hotels" variant="secondary">
                  View Hotels
                </Button>
              </div>

              <div className="mt-6 grid max-w-xl grid-cols-2 gap-4 text-sm text-white/80 sm:grid-cols-3">
                <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <p className="text-white font-semibold">Curated</p>
                  <p className="text-white/75">Packages</p>
                </div>
                <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <p className="text-white font-semibold">Verified</p>
                  <p className="text-white/75">Hotels</p>
                </div>
                <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <p className="text-white font-semibold">24/7</p>
                  <p className="text-white/75">Support</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right side premium glass panel */}
          <Reveal animation="animate-fade-up">
            <div className="surface p-6 sm:p-8">
              <h3 className="font-display text-2xl text-ink-900">Plan your next trip</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Share your destination and dates. We’ll suggest the best tours, hotels and
                properties—tailored to your budget and comfort.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-ink-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                    Popular
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink-900">
                  Nainital • Bhimtal • Sattal • Kainchi Dham • Mukteshwar • Lake Tours
                  </p>
                </div>
                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-ink-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                    Promise
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink-900">
                    Transparent pricing. Fast bookings. Peace of mind.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button to="/properties" variant="light" className="w-full">
                  Browse Properties <HiArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}