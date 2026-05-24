import Container from "../components/layout/Container.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function Properties() {
  return (
    <div className="min-h-screen bg-ink-50">
      <SiteHeader />
      <main className="py-16">
        <Container>
          <div className="surface p-8">
            <h1 className="font-display text-3xl text-ink-900">Properties</h1>
            <p className="mt-2 text-ink-600">
              This page is routed correctly. Add your property listings here.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}