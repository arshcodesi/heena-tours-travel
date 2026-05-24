import Container from "./Container.jsx";
import Button from "../ui/Button.jsx";
import { HiOutlinePhone, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function Footer() {
  // Replace with real business details
  const phoneNumber = "+919719030786";
  const whatsappNumber = "919719030786";
  const email = "hinatours@gmail.com";

  return (
    <footer className="border-t border-ink-100 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-xl text-ink-900">Hina Tours And Travel</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-600">
              Premium tours, verified hotels, and curated stays—designed for comfort,
              safety, and unforgettable experiences.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li>
                Phone:{" "}
                <a className="font-semibold text-ink-800 hover:text-brand-600" href={`tel:${phoneNumber}`}>
                  {phoneNumber}
                </a>
              </li>
              <li>
                Email:{" "}
                <a className="font-semibold text-ink-800 hover:text-brand-600" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li className="text-ink-500">Hours: 24/7 Support</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">Quick Actions</h4>
            <div className="mt-3 flex flex-col gap-3">
              <Button href={`https://wa.me/${whatsappNumber}`} variant="primary">
                <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
              <Button href={`tel:${phoneNumber}`} variant="light">
                <HiOutlinePhone className="h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink-100 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hina Tours And Travel. All rights reserved.</p>
          <p>Built with care for a premium travel experience.</p>
        </div>
      </Container>
    </footer>
  );
}