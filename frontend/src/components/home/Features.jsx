import Container from "../layout/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Reveal from "../ui/Reveal.jsx";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import {
  HiOutlineGlobeAlt,
  HiOutlineBuildingOffice2,
  HiOutlineHomeModern,
  HiArrowRight
} from "react-icons/hi2";

function FeatureCard({ icon: Icon, title, description, to, cta }) {
  return (
    <Reveal>
      <Card
        className={[
          "group h-full p-6 sm:p-7",
          "hover:-translate-y-1 hover:shadow-lift",
          "bg-gradient-to-b from-white to-ink-50/40"
        ].join(" ")}
      >
        <div className="flex items-start gap-4">
          <div
            className={[
              "grid h-12 w-12 place-items-center rounded-2xl",
              "bg-brand-500/10 text-brand-700 ring-1 ring-brand-500/15",
              "transition duration-300 group-hover:bg-brand-500 group-hover:text-white"
            ].join(" ")}
          >
            <Icon className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl text-ink-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>

            <div className="mt-5">
              <Button
                to={to}
                variant="ghost"
                className="px-0 text-brand-700 hover:bg-transparent hover:text-brand-800"
              >
                {cta} <HiArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* subtle bottom accent line */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-brand-500/40 via-brand-500/0 to-brand-500/0" />
      </Card>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section className="bg-ink-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Services"
            title="Everything you need for a comfortable journey"
            subtitle="A premium, end-to-end travel experience—handpicked tours, verified hotels, and quality properties with support at every step."
          />

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={HiOutlineGlobeAlt}
              title="Tours & Travel"
              description="Explore the beauty of Nainital and surrounding hill stations with our tailored tour packages. Experience serene lakes, lush forests, and local culture with expert planning and comfortable itineraries."
              to="/tours"
              cta="Explore Tours"
            />

            <FeatureCard
              icon={HiOutlineBuildingOffice2}
              title="Hotels"
              description="Verified hotel options across budgets—clean stays, great locations, and easy booking assistance."
              to="/hotels"
              cta="View Hotels"
            />

            <FeatureCard
              icon={HiOutlineHomeModern}
              title="Properties"
              description="Comfortable properties and stays for families and groups—perfect for longer trips and premium experiences."
              to="/properties"
              cta="Browse Properties"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}