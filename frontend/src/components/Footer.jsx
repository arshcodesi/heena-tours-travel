export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Heena Tours And Travel
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Premium tours, trusted stays, and verified properties — built for
              comfort, safety, and clarity.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Contact</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>
                Phone:{" "}
                <a className="text-slate-900" href="tel:+911234567890">
                  +91 12345 67890
                </a>
              </li>
              <li>
                Email:{" "}
                <a className="text-slate-900" href="mailto:info@heenatours.com">
                  info@heenatours.com
                </a>
              </li>
              <li>Hours: Mon–Sun, 9:00 AM – 9:00 PM</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Trust</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>• Clear pricing & confirmed availability</li>
              <li>• Customer-first support</li>
              <li>• Secure admin-managed listings</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200/70 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Heena Tours And Travel. All rights reserved.</p>
          <p>Built for performance • SEO-ready • Mobile-first</p>
        </div>
      </div>
    </footer>
  );
}