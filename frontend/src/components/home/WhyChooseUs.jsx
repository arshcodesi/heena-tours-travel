import Container from "../layout/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Reveal from "../ui/Reveal.jsx";
import Card from "../ui/Card.jsx";
import {
  HiOutlineShieldCheck,
  HiOutlineCurrencyRupee,
  HiOutlineBuildingOffice2,
  HiOutlineClock
} from "react-icons/hi2";

function Point({ icon: Icon, title, description }) {
  return (
    <Reveal>
      <Card className="group p-6 sm:p-7 hover:-translate-y-1 hover:shadow-lift">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-white shadow-soft transition group-hover:bg-brand-500">
            <Icon className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-lg text-ink-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why Hina"
              title="Travel planning that feels effortless"
              subtitle="We focus on comfort, clarity, and reliability—so you can enjoy your trip without stress."
            />

            <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-6">
              <p className="text-sm leading-relaxed text-ink-700">
                From short getaways to premium international trips, our team helps you
                choose the right plan, stay, and experience—based on your needs.
              </p>
              <p className="mt-3 text-sm font-semibold text-ink-900">
                Clear options • Fast booking • Strong support
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Point
              icon={HiOutlineShieldCheck}
              title="Trusted Service"
              description="Professional guidance and reliable bookings with customer-first support."
            />
            <Point
              icon={HiOutlineCurrencyRupee}
              title="Affordable Pricing"
              description="Transparent quotes and value-packed options to match your budget."
            />
            <Point
              icon={HiOutlineBuildingOffice2}
              title="Verified Hotels"
              description="Comfort-focused stays with quality checks and prime locations."
            />
            <Point
              icon={HiOutlineClock}
              title="24/7 Support"
              description="We’re available before, during, and after your trip—whenever needed."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}