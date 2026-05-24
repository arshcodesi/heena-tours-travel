import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function PageShell({ children }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 via-white to-white">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}