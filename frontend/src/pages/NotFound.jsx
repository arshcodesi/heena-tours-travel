import { Link } from "react-router-dom";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import Footer from "../components/layout/Footer.jsx";
import Container from "../components/layout/Container.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink-50">
      <SiteHeader />

      <main className="py-16">
        <Container>
          <div className="surface p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
              404 Error
            </p>

            <h1 className="mt-3 font-display text-3xl text-ink-900 sm:text-4xl">
              Page not found
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-600">
              The page you’re looking for doesn’t exist or may have been moved.
              Use the button below to return to the home page.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/" variant="primary">
                Back to Home
              </Button>

              <Link
                to="/tours"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-ink-700 ring-1 ring-ink-200 transition hover:bg-ink-100"
              >
                Browse Tours
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}