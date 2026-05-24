import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Logo() {
  return (
    <div className="flex items-center space-x-4">
      {/* Logo Icon or Image */}
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg text-xl font-bold select-none">
        {/* You can replace this text with an actual SVG or image */}
        H
      </div>
      {/* Brand Name */}
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Hina</h1>
        <p className="text-sm text-gray-500">Tours & Travel</p>
      </div>

      {/* Contact Buttons */}
      <div className="ml-auto flex items-center gap-4">
        <a
          href="https://wa.me/919719030786"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-2 text-white shadow hover:bg-green-700 transition"
          title="WhatsApp"
        >
          <FaWhatsapp />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <a
          href="tel:+919719030786"
          className="flex items-center gap-1 rounded-full bg-gray-900 px-3 py-2 text-white shadow hover:bg-gray-800 transition"
          title="Call"
        >
          <FaPhoneAlt />
          <span className="hidden sm:inline">Call</span>
        </a>
      </div>
    </div>
  );
}