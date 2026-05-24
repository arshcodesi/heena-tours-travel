import Marquee from "../components/Marquee.jsx";
import Hero from "../components/home/Hero.jsx";
import Features from "../components/home/Features.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import Gallery from "../components/home/Gallery.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top blue marquee (Car/Bike) */}
      <Marquee />

      <main>
        {/* ✅ Wrap Hero in relative so we can overlay the 2nd marquee */}
        <div className="relative">
          {/* ✅ This marquee is now OVER the hero (no white strip) */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 overflow-hidden">
            <div className="whitespace-nowrap animate-marquee">
            <span className="text-base sm:text-lg font-bold mr-16 drop-shadow-md
">
  <span className="text-red-600">Rent</span>{" "}
  <span className="text-yellow-400">• Buy • Lease Property in Nainital</span>{" "}
  <span className="text-black-600">— 📞 +91-9719030786</span>
</span>


<span className="text-base sm:text-lg font-bold mr-16 drop-shadow-md
">
  <span className="text-red-600">Rent</span>{" "}
  <span className="text-yellow-400">• Buy • Lease Property in Nainital</span>{" "}
  <span className="text-black-600">— 📞 +91-9719030786</span>
</span>


<span className="text-base sm:text-lg font-bold mr-16 drop-shadow-md
">
  <span className="text-red-600">Rent</span>{" "}
  <span className="text-yellow-400">• Buy • Lease Property in Nainital</span>{" "}
  <span className="text-black-600">— 📞 +91-9719030786</span>
</span>

            </div>
          </div>

          <Hero />
        </div>

        <Features />
        <WhyChooseUs />
        <Gallery />
      </main>

      <Footer />
    </div>
  );
}
